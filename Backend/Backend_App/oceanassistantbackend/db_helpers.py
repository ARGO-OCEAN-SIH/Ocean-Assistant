# oceanassistantbackend/db_helpers.py
from .models import ArgoMeasurement
from .query_converter import query_converter

def run_db_query(data: dict):
    """
    Execute a database query safely using Django ORM.
    """
    table = data.get("table")
    if table != "argo_measurements":
        return {"error": "Unknown table"}
    
    filters = data.get("conditions", {})
    cols = data.get("columns", [])
    
    try:
        # Django ORM query
        queryset = ArgoMeasurement.objects.filter(**filters)
        
        if cols:
            results = list(queryset.values(*cols)[:1000])  # Limit to 1000 records
        else:
            results = list(queryset.values()[:1000])
        
        return results
        
    except Exception as e:
        return {"error": f"Database query failed: {str(e)}"}

def natural_language_to_query(user_query: str):
    """Convert natural language to database query and execute"""
    # Convert natural language to query
    query_data = query_converter.convert_query(user_query)
    
    # Execute the query
    return run_db_query(query_data)