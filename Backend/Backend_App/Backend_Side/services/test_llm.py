# # services/test_llm.py
# from .llm_service import free_processor  # relative import

# while True:
#     user_input = input("You: ").strip()
#     if user_input.lower() in ["exit", "quit"]:
#         break
#     result = free_processor.process_text(user_input)
#     print("Assistant:", result["response"])

# NOW import your modules - THEY WILL WORK!
from oceanassistantbackend.db_helpers import run_db_query
from Backend_Side.services.llm_service import free_processor

print("✅ Django setup complete! Testing database...")

# Test database query
test_query = {
    "table": "argo_measurements",
    "columns": ["float_id", "latitude", "longitude", "temperature", "salinity"],
    "conditions": {"float_id": "D20250606_prof_0"}
}

try:
    result = run_db_query(test_query)
    print("✅ Database test SUCCESSFUL!")
    print(f"📊 Found {len(result)} records")
    
    if result:
        print("\n🔍 First 3 results:")
        for i, item in enumerate(result[:3]):
            print(f"{i+1}. Float: {item['float_id']}")
            print(f"   Location: {item['latitude']}°N, {item['longitude']}°E")
            print(f"   Temp: {item['temperature']}°C, Salinity: {item['salinity']} PSU")
            print()
            
except Exception as e:
    print(f"❌ Database test FAILED: {e}")

print("Testing LLM service...")