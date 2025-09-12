try:
    from voice_engine.api_voice import voice_engine
    HAS_VOICE_ENGINE = True
except ImportError as e:
    print(f"Voice engine import failed: {e}")
    HAS_VOICE_ENGINE = False
    voice_engine = None