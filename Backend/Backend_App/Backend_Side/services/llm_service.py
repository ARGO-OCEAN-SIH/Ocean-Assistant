# Backend_Side/services/llm_service.py

import os
import json
from dotenv import load_dotenv

# 🔹 Load environment variables from .env
load_dotenv()  # looks for .env in the current working directory

class FreeVoiceProcessor:
    def __init__(self, model_name: str = "llama-3.1-8b-instant"):
        self.model_name = model_name
        self.client = None
        self.conversation_history = []
        self.initialize_model()

    def initialize_model(self):
        """Initialize the Groq API client."""
        try:
            # 🔹 Read API key from environment loaded from .env
            api_key = os.getenv("GROQ_API_KEY") or os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("❌ No Groq API key found. Set GROQ_API_KEY or OPENAI_API_KEY in .env")

            self.client = OpenAI(
                base_url="https://api.groq.com/openai/v1",  # ✅ Groq endpoint
                api_key=api_key
            )
            print(f"✅ Connected to Groq model: {self.model_name}")
        except Exception as e:
            print(f"❌ Failed to initialize Groq client: {e}")
            self.client = None

    def process_text(self, text: str):
        """
        Send a message to the Groq model and return a response.
        Maintains a short conversation history (last 6 messages).
        """
        self.conversation_history.append({"role": "user", "content": text})
        if len(self.conversation_history) > 6:
            self.conversation_history = self.conversation_history[-6:]

        if not self.client:
            return {"response": "Groq API not initialized.", "success": False}

        try:
            completion = self.client.chat.completions.create(
                model=self.model_name,
                messages=self.conversation_history,
                temperature=0.7,
                max_tokens=150
            )
            reply = completion.choices[0].message.content.strip()
            self.conversation_history.append({"role": "assistant", "content": reply})
            return {"response": reply, "success": True}
        except Exception as e:
            return {"response": f"Error from Groq API: {e}", "success": False}

    def detect_db_request(self, text: str):
        print(f"🔍 DEBUG: detect_db_request called with: '{text}'")
        print(f"🔍 DEBUG: self.__class__: {self.__class__.__name__}")
        
        # Add this temporary hardcoded logic
        text_lower = text.lower().strip()
        print(f"🔍 DEBUG: text_lower: '{text_lower}'")
        
        # TEMPORARY: Always return argo_measurements queries
        if 'atlantic' in text_lower:
            result = {
                "is_db": True,
                "data": {
                    "table": "argo_measurements",
                    "columns": ["float_id", "latitude", "longitude", "temperature"],
                    "conditions": {"latitude__gt": 40, "longitude__lt": -20}
                }
            }
            print(f"🔍 DEBUG: Returning: {result}")
            return result
        
        elif any(word in text_lower for word in ['warm', 'hot', 'temperature']):
            result = {
                "is_db": True,
                "data": {
                    "table": "argo_measurements",
                    "columns": ["float_id", "latitude", "longitude", "temperature"],
                    "conditions": {"temperature__gt": 20}
                }
            }
            print(f"🔍 DEBUG: Returning: {result}")
            return result
        
        elif any(word in text_lower for word in ['float', 'd20250606', 'prof_0']):
            result = {
                "is_db": True,
                "data": {
                    "table": "argo_measurements",
                    "columns": ["timestamp", "pressure", "temperature", "salinity"],
                    "conditions": {"float_id": "D20250606_prof_0"}
                }
            }
            print(f"🔍 DEBUG: Returning: {result}")
            return result
        
        elif 'salinity' in text_lower:
            result = {
                "is_db": True,
                "data": {
                    "table": "argo_measurements",
                    "columns": ["float_id", "salinity", "latitude", "longitude"],
                    "conditions": {"salinity__gt": 35}
                }
            }
            print(f"🔍 DEBUG: Returning: {result}")
            return result
        
        else:
            result = {"is_db": False, "data": None}
            print(f"🔍 DEBUG: Returning: {result}")
            return result


    def reset_history(self):
        """Clear the conversation history."""
        self.conversation_history = []


# ✅ Global instance for easy import
free_processor = FreeVoiceProcessor()


# 🔹 Optional: Interactive CLI test
if __name__ == "__main__":
    print("🚀 Groq Chat (mixtral-8x7b) - type 'exit' to quit")
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ["exit", "quit"]:
            break
        
        # Test both functions
        print("\n--- Testing detect_db_request ---")
        db_check = free_processor.detect_db_request(user_input)
        print(f"DB Check: {db_check}")
        
        print("\n--- Testing process_text ---")
        result = free_processor.process_text(user_input)
        print("Assistant:", result["response"])
        print("-" * 50 + "\n")