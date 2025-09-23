from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # WebSocket endpoint for the voice assistant
    re_path(r'ws/voice/$', consumers.VoiceAssistantConsumer.as_asgi()),
]
