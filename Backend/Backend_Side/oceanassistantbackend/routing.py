from django.urls import re_path
from .consumers import AudioConsumer  # <-- must match class name

websocket_urlpatterns = [
    re_path(r'^ws/audio/$', AudioConsumer.as_asgi()),  # trailing slash important
]
