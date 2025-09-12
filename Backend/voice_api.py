# backend/voice_api.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

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
    voice_engine = MockVoiceEngine()

# ----------------------
# FastAPI App
# ----------------------
app = FastAPI(title="Ocean Voice Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
# Routes
# ----------------------
@app.get("/")
async def root():
    return {"message": "Ocean Voice Assistant API is running!"}

@app.get("/api/voice/status")
async def get_voice_status():
    """Get current status of voice engine"""
    return {
        "is_running": getattr(voice_engine, 'is_running', False),
        "is_awake": getattr(voice_engine, 'is_awake', False),
        "wake_word": getattr(voice_engine, 'wake_word', "hey ocean"),
        "status": "active" if getattr(voice_engine, 'is_awake', False) else "inactive"
    }

@app.post("/api/voice/control")
async def control_voice_engine(
    request: ActionRequest | None = None,
    action: str | None = Query(default=None)
):
    """Start or stop the voice engine (supports JSON body or query param)"""
    action_value = request.action if request else action
    if not action_value:
        raise HTTPException(status_code=400, detail="Missing 'action'. Use JSON body or query param.")

    if action_value.lower() == "start":
        voice_engine.is_running = True
        voice_engine.is_awake = True
        return {"status": "success", "message": "Voice engine started", "is_running": True}

    elif action_value.lower() == "stop":
        voice_engine.is_running = False
        voice_engine.is_awake = False
        return {"status": "success", "message": "Voice engine stopped", "is_running": False}

    else:
        raise HTTPException(status_code=400, detail="Invalid action. Use 'start' or 'stop'.")

@app.post("/api/voice/wake-word-test")
async def test_wake_word():
    voice_engine.is_awake = True
    return {"status": "success", "message": "Wake word response triggered"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "voice_engine_available": hasattr(voice_engine, 'is_awake'),
        "api_version": "1.0.0"
    }

# ----------------------
# Run Server
# ----------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
