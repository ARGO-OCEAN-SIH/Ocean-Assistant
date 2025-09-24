from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.db.models import Min, Max, Avg
import json
from .models import ArgoMeasurement
from .utils import get_response  # ✅ Use the unified response function

# Mock voice engine state
voice_engine = {"is_running": False, "is_awake": False, "wake_word": "hey ocean"}

# ---------------- Helper Functions ---------------- #

def json_response(data, status=200):
    """Helper function to return JSON responses"""
    return JsonResponse(data, status=status, safe=False)

def get_request_data(request):
    """Extract data from request based on method"""
    if request.method == 'GET':
        return request.GET
    else:
        try:
            return json.loads(request.body) if request.body else {}
        except json.JSONDecodeError:
            return {}

# ---------------- Voice Engine Endpoints ---------------- #

@require_http_methods(["GET"])
def root(request):
    return json_response({"message": "Ocean Voice Assistant API is running!"})

@require_http_methods(["GET"])
def get_voice_status(request):
    return json_response({
        "is_running": voice_engine["is_running"],
        "is_awake": voice_engine["is_awake"],
        "wake_word": voice_engine["wake_word"],
        "status": "active" if voice_engine["is_awake"] else "inactive"
    })

@csrf_exempt
@require_http_methods(["POST"])
def control_voice_engine(request):
    data = get_request_data(request)
    action = data.get("action")
    
    if not action:
        return json_response({"detail": "Missing 'action'"}, status=400)

    if action.lower() == "start":
        voice_engine["is_running"] = True
        voice_engine["is_awake"] = True
        return json_response({"status": "success", "message": "Voice engine started", "is_running": True})
    elif action.lower() == "stop":
        voice_engine["is_running"] = False
        voice_engine["is_awake"] = False
        return json_response({"status": "success", "message": "Voice engine stopped", "is_running": False})
    else:
        return json_response({"detail": "Invalid action"}, status=400)

@require_http_methods(["GET"])
def health_check(request):
    return json_response({
        "status": "healthy",
        "voice_engine_available": True,
        "api_version": "1.0.0"
    })

# ---------------- Query Processing Endpoints ---------------- #

@csrf_exempt
@require_http_methods(["GET", "POST"])
def process_query(request):
    """
    Accepts user queries and returns responses from database or LLM.
    
    GET params: ?q=<query>
    POST JSON: {"text": "<query>"}
    
    Returns: JSON with response and source information
    """
    data = get_request_data(request)
    
    # Get query from GET or POST
    if request.method == 'GET':
        user_query = data.get('q', '').strip()
    else:
        user_query = data.get('text', '').strip()
    
    if not user_query:
        return json_response({"error": "No query provided"}, status=400)
    
    # ✅ USE THE UNIFIED get_response FUNCTION (FIXED)
    result = get_response(user_query)
    return json_response(result)

@require_http_methods(["GET"])
def query_api(request):
    """
    GET endpoint for natural language queries
    Example: /api/query/?q=warm%20waters%20above%2020%20degrees
    """
    user_query = request.GET.get('q', '').strip()
    
    if not user_query:
        return json_response({"error": "No query provided. Use ?q=your+query"}, status=400)
    
    # ✅ USE THE UNIFIED get_response FUNCTION (FIXED)
    result = get_response(user_query)
    return json_response(result)

# ---------------- Argo Measurements Endpoints ---------------- #

@require_http_methods(["GET"])
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
    float_id = request.GET.get("float_id")
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")
    
    try:
        limit = int(request.GET.get("limit", 100))
    except ValueError:
        limit = 100

    if float_id:
        measurements = measurements.filter(float_id=float_id)
    if start_date and end_date:
        measurements = measurements.filter(timestamp__range=[start_date, end_date])

    # Apply limit and serialize
    measurements = measurements[:limit]
    
    data = list(measurements.values(
        "float_id", "timestamp", "latitude", "longitude",
        "pressure", "temperature", "salinity"
    ))
    return json_response(data)

@require_http_methods(["GET"])
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
    return json_response(stats)

# ---------------- Example Query Endpoints ---------------- #

@require_http_methods(["GET"])
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
    return json_response(examples)