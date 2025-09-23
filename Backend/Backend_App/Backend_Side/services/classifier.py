# services/classifier.py

def is_technical(query: str) -> bool:
    """
    Basic keyword-based check to decide if query is technical.
    Extend later with ML model.
    """
    technical_keywords = [
        "argo", "float", "temperature", "salinity", "pressure", 
        "longitude", "latitude", "dataset", "stations", "measurements"
    ]
    return any(word in query.lower() for word in technical_keywords)
