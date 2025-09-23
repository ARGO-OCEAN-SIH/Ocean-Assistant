from django.conf import settings
from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from django.conf import settings
from .forms import RegistrationForm, LoginForm
# Free local AI imports
try:
    from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
    import torch
    AI_AVAILABLE = True
    print("✓ Local AI models available")
except ImportError as e:
    print(f"✗ AI import error: {e}")
    AI_AVAILABLE = False

class FreeVoiceProcessor:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.conversation_history = []
        self.initialize_model()

    def initialize_model(self):
        """Initialize a free local AI model"""
        try:
            # Use a small, fast model that doesn't require much resources
            model_name = "microsoft/DialoGPT-small"  # Small and fast
            
            print(f"Loading free model: {model_name}")
            
            # Load tokenizer and model
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.tokenizer.pad_token = self.tokenizer.eos_token  # Set pad token
            
            # Load model with safe settings
            self.model = AutoModelForCausalLM.from_pretrained(
                model_name,
                dtype=torch.float32,
                low_cpu_mem_usage=True
            )
            
            print("✓ Free AI model loaded successfully")
            
        except Exception as e:
            print(f"✗ Failed to load AI model: {e}")
            self.model = None
            self.tokenizer = None

    def process_text(self, text):
        """Process text using free local model"""
        # Add to conversation history
        self.conversation_history.append(f"User: {text}")
        
        # Keep history manageable
        if len(self.conversation_history) > 6:
            self.conversation_history = self.conversation_history[-6:]
        
        if not self.model or not self.tokenizer:
            # Fallback responses if model fails
            return self.fallback_response(text)
        
        try:
            # Prepare input
            conversation_context = "\n".join(self.conversation_history)
            input_text = f"{conversation_context}\nAssistant:"
            
            # Tokenize input
            inputs = self.tokenizer.encode(input_text, return_tensors="pt")
            
            # Generate response
            with torch.no_grad():
                outputs = self.model.generate(
                    inputs,
                    max_length=len(inputs[0]) + 50,  # Add some tokens for response
                    num_return_sequences=1,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id
                )
            
            # Decode response
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract only the new response part
            response = response.replace(input_text, "").strip()
            
            # Add to history
            self.conversation_history.append(f"Assistant: {response}")
            
            return {
                "response": response,
                "success": True,
                "model": "free-local"
            }
            
        except Exception as e:
            print(f"Model error: {e}")
            return self.fallback_response(text)

    def fallback_response(self, text):
        """Simple rule-based responses"""
        text_lower = text.lower()
        
        responses = {
            "hello": "Hello! How can I help you today?",
            "hi": "Hi there! What can I do for you?",
            "how are you": "I'm doing well, thank you! How can I assist you?",
            "what can you do": "I can help answer questions and have conversations. Try asking me something!",
            "thank you": "You're welcome! Is there anything else I can help with?",
            "bye": "Goodbye! Have a great day!",
            "help": "I'm here to help! You can ask me questions or just chat with me.",
            "name": "I'm your friendly AI assistant!",
        }
        
        for pattern, response in responses.items():
            if pattern in text_lower:
                return {
                    "response": response,
                    "success": True,
                    "model": "rule-based"
                }
        
        # Default response
        return {
            "response": "I heard you! How can I help you today?",
            "success": True,
            "model": "default"
        }

# Initialize free processor
free_processor = FreeVoiceProcessor()

@csrf_exempt
def process_voice(request):
    """Process text from voice input - COMPLETELY FREE!"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get('text', '').strip()
            
            if not text:
                return JsonResponse({"error": "No text provided"}, status=400)
            
            # Process with FREE AI
            result = free_processor.process_text(text)
            return JsonResponse(result)
                
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def ai_status(request):
    """Check AI status"""
    return JsonResponse({
        "ai_available": AI_AVAILABLE,
        "model_loaded": free_processor.model is not None,
        "completely_free": True,
        "no_api_keys": True,
        "message": "🎉 100% FREE - No API keys required!"
    })

# Keep your other views (Home, Register, Login) as they were
class Home(View):
    def get(self, request):
        # Check AI status
        ai_loaded = free_processor.model is not None
        
        return render(request, 'home.html', {
            'ai_available': AI_AVAILABLE,
            'ai_loaded': ai_loaded,
            'completely_free': True
        })
    
class Register(View):
    def get(self, request):
        # Your registration form logic
        form = RegistrationForm()
        return render(request, 'register.html', {'form': form})
    
    def post(self, request):
        # Your registration logic
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # Create user logic
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            email = form.cleaned_data.get('email', '')
            
            try:
                user = User.objects.create_user(username, email, password)
                login(request, user)
                messages.success(request, 'Registration successful')
                return redirect("backend:home")
            except:
                messages.error(request, 'Username already exists')
        return render(request, 'register.html', {'form': form})
    
class Login(View):
    def get(self, request):
        form = LoginForm()
        return render(request, 'login.html', {'form': form})
    
    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, 'Logged in successfully')
                return redirect("backend:home")
            else:
                messages.error(request, 'Invalid credentials')
        return render(request, 'login.html', {'form': form})
