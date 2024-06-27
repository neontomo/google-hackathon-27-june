import axios from 'axios'
import React, { useState, useEffect } from 'react'

type messageTypes = {
  id: number
  message: string
  from: 'system' | 'user'
}

function Phone() {
  const [currentMessage, setCurrentMessage] = useState('' as string)
  const [messages, setMessages] = useState([] as messageTypes[])

  function stripHtml(htmlString: string) {
    // Using a regular expression to remove HTML tags
    return htmlString?.replace(/<[^>]*>?/gm, '')
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      const history = document.getElementById('history')
      if (history) {
        history.scrollTop = history.scrollHeight
      }
    }, 500)
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!currentMessage.trim()) return

    const myMessage = {
      id: messages.length + 1,
      message: currentMessage,
      from: 'user'
    } as messageTypes

    try {
      axios
        .post('http://localhost:8000/generate', {
          prompt: [myMessage.message, 'answer briefly.'].join('\n')
        })
        .then((response) => {
          const newMessage = {
            id: messages.length + 2,
            message: response.data.response,
            from: 'system'
          } as messageTypes

          setMessages([...messages, myMessage, newMessage])

          scrollToBottom()
        })
    } catch (error) {
      const newMessage = {
        id: messages.length + 2,
        message: 'error occurred. please try again.',
        from: 'system'
      } as messageTypes

      setMessages([...messages, myMessage, newMessage])

      scrollToBottom()
    }

    setCurrentMessage('')
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        id="phone"
        className="h-[852px] w-[393px] rounded-[50px] scale-[0.8] flex flex-col gap-8 bg-blue-50 border-black box-content border-8">
        <div
          id="history"
          className="w-full bg-gray-100 grow mt-16 px-8 border-white border-t-2 flex flex-col gap-4 py-4 max-h-[calc(100%-4rem)] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              id={`message-${message.id}`}
              className={`${
                message.from === 'user'
                  ? 'bg-blue-400 ml-auto text-white'
                  : 'bg-white text-black'
              } flex rounded-2xl p-4 w-2/3 whitespace-pre text-wrap`}>
              {stripHtml(message.message as string)}
            </div>
          ))}
        </div>
        <div
          id="message-input"
          className="px-8 pb-8">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-row w-full h-16 rounded-full pl-8 bg-white text-black border border-transparent hover:border-blue-500">
            <input
              type="text"
              placeholder="message"
              className="w-full h-full bg-transparent outline-none"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <div id="sendButton">
              <button
                type="submit"
                className="w-16 h-16 rounded-full bg-blue-400 hover:opacity-80 text-black flex justify-center items-center ml-4">
                <img
                  src="/send.svg"
                  alt="send"
                  className="w-8 h-8"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Phone
