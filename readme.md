# google hackathon notes

# images

![hackathon](https://github.com/neontomo/google-hackathon-27-june/assets/105588693/508bcdf8-41d5-4458-9f6e-bafd0c3d8ab4)

_me together with the first place winners!_

![hackaton-cillers-27-june](https://github.com/neontomo/google-hackathon-27-june/assets/105588693/220cddf8-5761-4810-9864-38e329682b97)

_my solution._

# description

I won second place at a Google/Cillers hackathon on 27 june 2024.

this solution was built in 8h, and had many requirements that I was unfamiliar with. this meant I needed to prioritise and learn on the fly, as I was the only developer on my team. I had to build a chatbot that could track packages but also answer any other question, based on the Google Cloud VertexAI API. There was also a design spec to follow and the winners were voted based on hitting the requirements. my solution is slightly messy, and I won't update it after the fact, but it works and I learned a lot! the group that came first helped me understand that winning a hackathon is half creating a badass solution, and half presenting it.

## tech to use

- Google Cloud API (VertexAI)
- Airmee API for tracking packages
- Cillers.com framework for full stack (react, auth, db, etc)

## resources

- Design specs: https://www.figma.com/design/xwQ7OZF7a7dEPDxhjcGPdn/Hackathon-case?node-id=3-2&t=KPFX7zbkFkMEmdf2-0
- Airmee API: https://api.airmee.com/track/track_by_url?tracking_url=92FC20&phone_number_hash=bf2b38
- Bonus API: https://www.power.se/api/v2/products/2669641/stores?postalCode=11239&amount=2

## milestones

### milestone 1

[x] Set Up Your Environment: Ensure you have the necessary tools and libraries installed to work with the Google Cloud API.
[x] API Connection: Write code to authenticate and connect to the Google Cloud API.
[x] Build the Chatbox: Develop a straightforward chat interface where users can input their queries.
[x] Display Responses: Configure the chatbox to display the API's responses in a clear, readable format.
[x] Test Your Integration: Ensure everything works seamlessly, from sending a query to receiving and displaying the response.

### milestone 2

[x] Design the Interface: Use the Figma design provided and your favorite framework and create the styled chatbox interface. Include elements like input fields, send buttons, and response displays.
[x] Set Up API Integration: Use the integration you made in track 1 with your interface.
[x] Test and Refine: Ensure the chatbox is fully functional.

### milestone 3

[x] Tracking API: Use the provided Airmee tracking API in Discord and make sure you can fetch delivery status from a tracking number.
[x] Test the integration: Make sure the integration works.

### milestone 4

[x] Integrate: Integrate the interface you built in step 2 with the logic from step 3.
[x] Build the logic: Make sure you can prompt where is my package and fetch the correct details from the tracking number

### milestone 6 (actually 5)

[] Find product in the closest store: Integrate with the power.se API in Discord to find a product
[] Test the integration: Make sure the integration works.
