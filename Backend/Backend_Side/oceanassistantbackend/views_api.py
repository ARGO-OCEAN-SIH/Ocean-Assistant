from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Mock voice engine state
voice_engine = {"is_running": False, "is_awake": False, "wake_word": "hey ocean"}

@api_view(["GET"])
def root(request):
    return Response({"message": "Ocean Voice Assistant API is running!"})

@api_view(["GET"])
def get_voice_status(request):
    return Response({
        "is_running": voice_engine["is_running"],
        "is_awake": voice_engine["is_awake"],
        "wake_word": voice_engine["wake_word"],
        "status": "active" if voice_engine["is_awake"] else "inactive"
    })

@api_view(["POST"])
def control_voice_engine(request):
    action = request.data.get("action")
    if not action:
        return Response({"detail": "Missing 'action'"}, status=status.HTTP_400_BAD_REQUEST)

    if action.lower() == "start":
        voice_engine["is_running"] = True
        voice_engine["is_awake"] = True
        return Response({"status": "success", "message": "Voice engine started", "is_running": True})
    elif action.lower() == "stop":
        voice_engine["is_running"] = False
        voice_engine["is_awake"] = False
        return Response({"status": "success", "message": "Voice engine stopped", "is_running": False})
    else:
        return Response({"detail": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "healthy",
        "voice_engine_available": True,
        "api_version": "1.0.0"
    })