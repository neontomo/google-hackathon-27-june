const cors = require('cors')
const express = require('express')
const { VertexAI } = require('@google-cloud/vertexai')
const axios = require('axios')
const { stringify } = require('querystring')

const app = express()
const PORT = process.env.PORT || 8000

const PROJECT_ID = 'genai-cillers24sto-5113'
const LOCATION = 'europe-west1'
const MODEL_NAME = 'gemini-1.5-flash-001'

app.use(express.json())

app.use(cors())

async function get_airmee_tracking_data(tracking_url, phone_number_hash) {
  // https://api.airmee.com/track/track_by_url?tracking_url=92FC20&phone_number_hash=bf2b38

  const url = `https://api.airmee.com/track/track_by_url?tracking_url=${tracking_url}&phone_number_hash=${phone_number_hash}`
  const response = await axios.get(url)

  return response.data
}

async function generate_from_text_input(prompt = '') {
  if (!prompt) {
    return 'Prompt is required'
  }
  const vertexAI = new VertexAI({
    project: PROJECT_ID,
    location: LOCATION
  })

  const generativeModel = vertexAI.getGenerativeModel({
    model: MODEL_NAME
  })

  if (
    prompt &&
    prompt.match(/(tracking|track|package|parcel)/gi) &&
    !prompt.match(/(the user has asked:)/gi)
  ) {
    try {
      const newPrompt = [
        'the user has asked:',
        prompt,
        'now parse that statement and return json data with tracking_url and phone_number_hash parameters that they provided. dont provide anything else, no comments, no extra text, just the json data so it can be parsed straight away.'
      ].join('\n')

      const reply = await generate_from_text_input(newPrompt)
      const jsonString = JSON.parse(
        reply.replace(/```json/g, '').replace(/```/, '')
      )
      const { tracking_url, phone_number_hash } = jsonString

      const response = await get_airmee_tracking_data(
        tracking_url,
        phone_number_hash
      )

      const delivery_status = response.order_details[0].courier_status_formatted

      return delivery_status === 'Delivered'
        ? `I can see that your order was delivered yesterday via Airmee.`
        : 'I can see that your order was shipped out via Airmee. It is currently on its way.'
    } catch (error) {
      console.error(error)
      return "I'm sorry, I don't understand your question. Please try again."
    }
  }

  const resp = await generativeModel.generateContent(prompt)
  const contentResponse = await resp.response
  const reply = contentResponse?.candidates?.[0]?.content.parts?.[0]?.text

  console.log(reply)
  return reply ?? "I'm sorry, I don't have an answer to that. Please try again."
}

app.post('/generate', async (req, res) => {
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    const response = await generate_from_text_input(prompt)
    res.status(200).json({ response: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to generate content' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
