from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login
from .forms import LoginForm, RegistrationForm
from django.contrib import messages

import json
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from openai import OpenAI
from django.conf import settings

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
# Create your views here.
class Home(View):
    def get(self, request):
        # Check if OpenAI is configured
        openai_available = hasattr(settings, 'OPENAI_API_KEY') or os.environ.get('OPENAI_API_KEY')
        return render(request, 'home.html', {'openai_available': openai_available})
    
class Register(View):
    def get(self, request):
        form = RegistrationForm()
        return render(request, 'register.html', {'form': form})
    
    def post(self, request):
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Registration successful')
            return redirect("backend:home")
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

# Initialize OpenAI client
def get_openai_client():
    try:
        # Try to get API key from environment variable first
        api_key = os.environ.get("OPENAI_API_KEY")
        
        # If not found in environment, try from Django settings
        if not api_key:
            api_key = getattr(settings, "OPENAI_API_KEY", None)
        
        if api_key and api_key != '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':
            return OpenAI(api_key=api_key), True
        else:
            return None, False
            
    except Exception as e:
        print(f"OpenAI client initialization error: {e}")
        return None, False

@csrf_exempt
def upload_audio(request):
    if request.method == "POST" and request.FILES.get("file"):
        try:
            # Get OpenAI client
            client, openai_available = get_openai_client()
            
            # Check if OpenAI client is available
            if not openai_available or not client:
                return JsonResponse({
                    "error": "Speech-to-text service is not configured. Please set up OpenAI API key.",
                    "fallback": True,
                    "details": "API key not configured"
                }, status=503)
                
            # Save uploaded file temporarily
            audio_file = request.FILES["file"]
            file_name = f"audio_{request.user.id if request.user.is_authenticated else 'anonymous'}_{audio_file.name}"
            file_path = default_storage.save(file_name, audio_file)

            # Transcribe with OpenAI Whisper
            with open(file_path, "rb") as f:
                transcript = client.audio.transcriptions.create(
                    model="whisper-1",
                    file=f
                )

            text = transcript.text

            # Clean up temporary file
            if default_storage.exists(file_path):
                default_storage.delete(file_path)

            # Save to JSON
            with open("spoken_text.json", "w", encoding="utf-8") as jf:
                json.dump({"spoken_text": text}, jf, ensure_ascii=False, indent=4)

            # Save to TXT
            with open("spoken_text.txt", "w", encoding="utf-8") as tf:
                tf.write(text)

            return JsonResponse({"text": text})

        except Exception as e:
            # Clean up temporary file in case of error
            if 'file_path' in locals() and default_storage.exists(file_path):
                default_storage.delete(file_path)
                
            error_msg = str(e)
            if "quota" in error_msg.lower() or "insufficient_quota" in error_msg:
                return JsonResponse({
                    "error": "Speech-to-text service quota exceeded. Please try again later.",
                    "fallback": True
                }, status=503)
            elif "API key" in error_msg or "401" in error_msg or "auth" in error_msg.lower():
                return JsonResponse({
                    "error": "Invalid OpenAI API key. Please check your API key configuration.",
                    "fallback": True,
                    "details": "API key authentication failed"
                }, status=401)
            else:
                return JsonResponse({
                    "error": f"Error processing audio: {error_msg}",
                    "fallback": True
                }, status=500)

    return JsonResponse({"error": "No audio uploaded"}, status=400)

@csrf_exempt
def save_text(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            text = data.get("text", "")
            
            if text:
                # Save to JSON
                with open("spoken_text.json", "w", encoding="utf-8") as jf:
                    json.dump({"spoken_text": text}, jf, ensure_ascii=False, indent=4)

                # Save to TXT
                with open("spoken_text.txt", "w", encoding="utf-8") as tf:
                    tf.write(text)
                    
                return JsonResponse({"status": "success"})
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    return JsonResponse({"error": "Invalid request"}, status=400)