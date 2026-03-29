# oceanassistantbackend/utils.py
from Backend_Side.services.llm_service import free_processor
from .db_helpers import run_db_query, natural_language_to_query

def should_use_database(user_query):
    """Determine if query should use database or LLM"""
    query_lower = user_query.lower().strip()
    
    # General knowledge questions → LLM
    general_patterns = ['what is', 'explain', 'tell me about', 'how does', 'why']
    if any(query_lower.startswith(pattern) for pattern in general_patterns):
        return False
    
    # Data requests → Database
    database_patterns = ['show me', 'find', 'get', 'give me', 'data', 'measurements']
    if any(pattern in query_lower for pattern in database_patterns):
        return True
    
    return False

def format_database_response(user_query, db_results):
    if not db_results or not isinstance(db_results, list):
        return "I couldn't find any ocean data matching your query."

    response = f"🌊 Ocean Data Analysis\n\n"
    response += f"📊 Found {len(db_results)} measurements matching your query\n\n"

    # Show first 3 results instead of only 1
    for i, sample in enumerate(db_results[:3]):
        response += f"--- Measurement {i+1} ---\n"

        if 'latitude' in sample and 'longitude' in sample:
            response += f"📍 Location: {sample['latitude']}°, {sample['longitude']}°\n"

        if 'temperature' in sample:
            response += f"🌡️ Temperature: {sample['temperature']} °C\n"

        if 'salinity' in sample:
            response += f"🧂 Salinity: {sample['salinity']} PSU\n"

        if 'pressure' in sample:
            response += f"⬇️ Pressure: {sample['pressure']} dbar\n"

        response += "\n"

    response += "💡 Based on real Argo float measurements"

    return response

def get_response(user_query):
    """Main function to handle user queries"""
    cleaned_query = user_query.strip()
    
    if not cleaned_query:
        return {"response": "Please provide a question about ocean data.", "source": "system"}
    
    # 1️⃣ Check if this should be a database query
    if should_use_database(cleaned_query):
        try:
            db_result = natural_language_to_query(cleaned_query)
            
            if isinstance(db_result, list) and db_result:
                # ✅ RETURN FORMATTED RESPONSE, NOT RAW DATA
                formatted_response = format_database_response(cleaned_query, db_result)
                return {"response": formatted_response, "source": "database"}
            else:
                # Fallback to LLM
                llm_result = free_processor.process_text(cleaned_query)
                return {"response": llm_result["response"], "source": "llm"}
                
        except Exception as e:
            # Error fallback to LLaaaM
            llm_result = free_processor.process_text(cleaned_query)
            return {"response": llm_result["response"], "source": "llm_error"}
    
    # 2️⃣ Use LLM for general knowledge
    try:
        llm_result = free_processor.process_text(cleaned_query)
        return {"response": llm_result["response"], "source": "llm_general"}
    except Exception as e:
        return {"response": "I'm having trouble processing your request.", "source": "system_error"}