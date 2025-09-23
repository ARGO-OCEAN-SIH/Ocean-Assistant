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
from django.utils.decorators import method_decorator
# Import your LLM service
from Backend_Side.services.llm_service import free_processor  # ✅ Groq LLM

class Home(View):
    def get(self, request):
        # Check AI status
        ai_loaded = free_processor.client is not None
        
        return render(request, 'home.html', {
            'ai_available': True,
            'ai_loaded': ai_loaded,
            'completely_free': False,  # Groq API is not fully free
        })

class Register(View):
    def get(self, request):
        from .forms import RegistrationForm
        form = RegistrationForm()
        return render(request, 'register.html', {'form': form})
    
    def post(self, request):
        from .forms import RegistrationForm
        form = RegistrationForm(request.POST)
        if form.is_valid():
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
        from .forms import LoginForm
        form = LoginForm()
        return render(request, 'login.html', {'form': form})
    
    def post(self, request):
        from .forms import LoginForm
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

@csrf_exempt
def process_voice(request):
    """Process text using Groq LLM service"""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get('text', '').strip()
            
            if not text:
                return JsonResponse({"error": "No text provided"}, status=400)
            
            # ✅ Process with Groq LLM service
            result = free_processor.process_text(text)
            return JsonResponse(result)
                
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except Exception as e:
            return JsonResponse({"error": f"Server error: {str(e)}"}, status=500)
    
    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)

@csrf_exempt
def ai_status(request):
    """Check LLM service status"""
    return JsonResponse({
        "ai_available": free_processor.client is not None,
        "model_loaded": free_processor.client is not None,
        "completely_free": False,
        "message": "Uses Groq API - requires valid API key"
    })

@method_decorator(csrf_exempt, name='dispatch')
class Test(View):
    def get(self, request):
        return render(request, 'test.html')
    
    def post(self, request):
        # Simply confirm receipt of voice input
        try:
            # Get the transcript from POST data
            data = json.loads(request.body)
            transcript = data.get('transcript', '')
            
            print(f"🎯 Received voice input: '{transcript}'")  # This will print to Django console
            
            if not transcript:
                return JsonResponse({
                    'success': False, 
                    'message': 'No transcript received'
                }, status=400)
            
            # Just return a confirmation with the received text
            return JsonResponse({
                'success': True,
                'message': 'Voice input received successfully!',
                'received_text': transcript,
                'backend_confirmation': f'Django backend confirmed: "{transcript}"'
            })
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)