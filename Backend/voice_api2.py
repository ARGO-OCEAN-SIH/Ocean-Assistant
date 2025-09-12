# backend/voice_api_ws.py

from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import sys
import os
import threading

# Add project root to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

# ----------------------
# Voice Engine Import
# ----------------------
try:
    from voice_engine.voice_module import SimpleSpeechRecognizer
    voice_engine = SimpleSpeechRecognizer(wake_word="hey ocean")
    print("✅ Voice engine imported successfully!")
except ImportError as e:
    print(f"❌ Failed to import voice engine: {e}")
    print("💡 Running in mock mode for testing")
    class MockVoiceEngine:
        def __init__(self):
            self.is_awake = False
            self.wake_word = "hey ocean"
            self.is_running = False
        def speak(self, text):
            print(f"[MOCK SPEAK] {text}")
    voice_engine = MockVoiceEngine()

# ----------------------
# FastAPI App
# ----------------------
app = FastAPI(title="Ocean Voice Assistant WebSocket API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------
# Models
# ----------------------
class ActionRequest(BaseModel):
    action: str

# ----------------------
# REST Endpoints
# ----------------------
@app.get("/")
async def root():
    return {"message": "Ocean Voice Assistant API is running!"}

@app.get("/api/voice/status")
async def get_voice_status():
    return {
        "is_running": getattr(voice_engine, 'is_running', False),
        "is_awake": getattr(voice_engine, 'is_awake', False),
        "wake_word": getattr(voice_engine, 'wake_word', "hey ocean"),
        "status": "active" if getattr(voice_engine, 'is_awake', False) else "inactive"
    }

@app.post("/api/voice/control")
async def control_voice_engine(request: ActionRequest | None = None, action: str | None = None):
    """Start or stop voice engine"""
    action_value = request.action if request else action
    if not action_value:
        raise HTTPException(status_code=400, detail="Missing 'action'")
    
    if action_value.lower() == "start":
        voice_engine.is_running = True
        voice_engine.is_awake = True
        return {"status": "success", "message": "Voice engine started", "is_running": True}
    elif action_value.lower() == "stop":
        voice_engine.is_running = False
        voice_engine.is_awake = False
        return {"status": "success", "message": "Voice engine stopped", "is_running": False}
    else:
        raise HTTPException(status_code=400, detail="Invalid action")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "voice_engine_available": hasattr(voice_engine, 'is_awake'), "api_version": "1.0.0"}

# ----------------------
# WebSocket Endpoint
# ----------------------
@app.websocket("/ws/voice")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    streaming = False

    async def speak_thread(text):
        """Run TTS in separate thread to avoid blocking WebSocket"""
        def _speak():
            try:
                if hasattr(voice_engine, "tts"):
                    voice_engine.tts.say(text)
                    voice_engine.tts.runAndWait()
                elif hasattr(voice_engine, "speak"):
                    voice_engine.speak(text)
            except Exception as e:
                print(f"Error in TTS thread: {e}")
        threading.Thread(target=_speak).start()

    try:
        while True:
            data = await ws.receive_json()
            action = data.get("action")

            if action == "start_stream":
                streaming = True
                await ws.send_json({"status": "streaming_started", "message": "Voice streaming started."})
                
                # Example streaming: send mock audio chunks
                for i in range(5):
                    if not streaming:
                        break
                    chunk_text = f"Audio chunk {i+1}"
                    await ws.send_text(chunk_text)
                    await asyncio.sleep(1)
                    await speak_thread(chunk_text)

                await ws.send_json({"status": "streaming_ended", "message": "Voice streaming ended."})
            
            elif action == "stop_stream":
                streaming = False
                await ws.send_json({"status": "stopped", "message": "Voice streaming stopped by user."})
            
            else:
                await ws.send_json({"status": "unknown_action", "message": f"Unknown action: {action}"})

    except Exception as e:
        await ws.close()
        print(f"WebSocket closed: {e}")

# ----------------------
# Run Server
# ----------------------
if __name__ == "__main__":
    import uvicorn
    print("🌊 Starting Ocean Voice Assistant WebSocket API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
