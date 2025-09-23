# oceanassistantbackend/views_api.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import get_response  # ✅ Use the unified response function
from .models import ArgoMeasurement
from django.db.models import Min, Max, Avg  # ✅ Import aggregation functions

# Mock voice engine state
voice_engine = {"is_running": False, "is_awake": False, "wake_word": "hey ocean"}

# ---------------- Voice Engine Endpoints ---------------- #

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

# ---------------- Query Processing Endpoints ---------------- #

@api_view(["GET", "POST"])
def process_query(request):
    """
    Accepts user queries and returns responses from database or LLM.
    
    GET params: ?q=<query>
    POST JSON: {"text": "<query>"}
    
    Returns: JSON with response and source information
    """
    # Get query from GET or POST
    if request.method == 'GET':
        user_query = request.GET.get('q', '').strip()
    else:
        user_query = request.data.get('text', '').strip()
    
    if not user_query:
        return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    # ✅ USE THE UNIFIED get_response FUNCTION (FIXED)
    result = get_response(user_query)
    return Response(result)

@api_view(["GET"])
def query_api(request):
    """
    GET endpoint for natural language queries
    Example: /api/query/?q=warm%20waters%20above%2020%20degrees
    """
    user_query = request.GET.get('q', '').strip()
    
    if not user_query:
        return Response({"error": "No query provided. Use ?q=your+query"}, status=status.HTTP_400_BAD_REQUEST)
    
    # ✅ USE THE UNIFIED get_response FUNCTION (FIXED)
    result = get_response(user_query)
    return Response(result)

# ---------------- Argo Measurements Endpoints ---------------- #

@api_view(["GET"])
def fetch_argo_data(request):
    """
    Fetch all Argo measurements from the database.
    Optional query parameters:
        - float_id: filter by float_id
        - start_date, end_date: filter by timestamp range (YYYY-MM-DD)
        - limit: number of records to return (default: 100)
    """
    measurements = ArgoMeasurement.objects.all()

    # Optional filtering
    float_id = request.query_params.get("float_id")
    start_date = request.query_params.get("start_date")
    end_date = request.query_params.get("end_date")
    limit = int(request.query_params.get("limit", 100))

    if float_id:
        measurements = measurements.filter(float_id=float_id)
    if start_date and end_date:
        measurements = measurements.filter(timestamp__range=[start_date, end_date])

    # Apply limit and serialize
    measurements = measurements[:limit]
    
    data = measurements.values(
        "float_id", "timestamp", "latitude", "longitude",
        "pressure", "temperature", "salinity"
    )
    return Response(list(data))

@api_view(["GET"])
def argo_stats(request):
    """
    Get statistics about Argo data
    """
    stats = {
        "total_records": ArgoMeasurement.objects.count(),
        "unique_floats": ArgoMeasurement.objects.values('float_id').distinct().count(),
        "temperature_range": {
            "min": ArgoMeasurement.objects.aggregate(Min('temperature'))['temperature__min'],
            "max": ArgoMeasurement.objects.aggregate(Max('temperature'))['temperature__max'],
            "avg": ArgoMeasurement.objects.aggregate(Avg('temperature'))['temperature__avg']
        },
        "data_coverage": {
            "has_temperature": ArgoMeasurement.objects.exclude(temperature__isnull=True).count(),
            "has_salinity": ArgoMeasurement.objects.exclude(salinity__isnull=True).count()
        }
    }
    return Response(stats)

# ---------------- Example Query Endpoints ---------------- #

@api_view(["GET"])
def example_queries(request):
    """
    Get list of example queries that work with the system
    """
    examples = [
        {
            "query": "warm waters above 20 degrees",
            "endpoint": "/api/process_query/?q=warm%20waters%20above%2020%20degrees",
            "description": "Find waters warmer than 20°C"
        },
        {
            "query": "north atlantic data",
            "endpoint": "/api/process_query/?q=north%20atlantic%20data",
            "description": "Get data from North Atlantic region"
        },
        {
            "query": "float D20250606_prof_0",
            "endpoint": "/api/process_query/?q=float%20D20250606_prof_0",
            "description": "Get measurements from specific float"
        },
        {
            "query": "high salinity areas",
            "endpoint": "/api/process_query/?q=high%20salinity%20areas",
            "description": "Find areas with high salinity"
        },
        {
            "query": "temperature between 10 and 20 degrees",
            "endpoint": "/api/process_query/?q=temperature%20between%2010%20and%2020%20degrees",
            "description": "Find waters with temperature between 10-20°C"
        }
    ]
    return Response(examples)