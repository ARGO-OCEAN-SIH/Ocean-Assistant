from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import pyttsx3

# Replace with your actual backend RAG / SQL query
async def query_ocean_data(query_text):
    await asyncio.sleep(1)  # simulate processing
    return f"Processed response for: {query_text}"

class VoiceAssistantConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.engine = pyttsx3.init()
        print("WebSocket connected")

    async def disconnect(self, close_code):
        self.engine.stop()
        print("WebSocket disconnected")

    async def receive(self, text_data=None, bytes_data=None):
        data = json.loads(text_data)
        query_text = data.get('query', '')

        response_text = await query_ocean_data(query_text)

        # Send response back to frontend
        await self.send(text_data=json.dumps({'response': response_text}))

        # Speak the response
        self.engine.say(response_text)
        self.engine.runAndWait()
