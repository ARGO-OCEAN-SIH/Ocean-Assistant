from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import asyncio
import json
import speech_recognition as sr
import pyttsx3
import threading

app = FastAPI(title="Ocean Voice Assistant API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VoiceEngine:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.tts = pyttsx3.init()
        self.tts.setProperty('rate', 180)
        self.setup_parameters()
    
    def setup_parameters(self):
        self.recognizer.energy_threshold = 400
        self.recognizer.pause_threshold = 1.0
        self.recognizer.dynamic_energy_threshold = True
    
    def process_audio(self, audio_data):
        """Process audio data and return text"""
        try:
            text = self.recognizer.recognize_google(audio_data)
            return text, "success"
        except sr.UnknownValueError:
            return "", "unclear"
        except sr.RequestError:
            return "", "api_error"
    
    def speak(self, text):
        """Convert text to speech"""
        self.tts.say(text)
        self.tts.runAndWait()

voice_engine = VoiceEngine()

@app.get("/")
async def root():
    return {"message": "Ocean Voice Assistant API"}

@app.websocket("/ws/voice")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Receive audio data from React
            data = await websocket.receive_bytes()
            
            # Process audio (you'll need to convert bytes to audio format)
            text, status = voice_engine.process_audio(data)
            
            # Send result back to React
            await websocket.send_json({
                "text": text,
                "status": status,
                "type": "transcription"
            })
            
            # If wake word detected, respond
            if "hey ocean" in text.lower():
                voice_engine.speak("I'm here! How can I help?")
                await websocket.send_json({
                    "type": "wake_word_detected",
                    "message": "Wake word detected"
                })
                
    except WebSocketDisconnect:
        print("Client disconnected")

@app.post("/api/speak")
async def text_to_speech(text: str):
    """Convert text to speech"""
    voice_engine.speak(text)
    return {"status": "spoken", "text": text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)