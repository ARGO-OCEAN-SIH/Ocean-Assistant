from django.shortcuts import render, redirect
from django.views import View
from django.contrib.auth import authenticate, login
from .forms import LoginForm, RegistrationForm
from django.contrib import messages
# Create your views here.
class Home(View):
    def get(self, request):
        return render(request, 'home.html')
    
class Register(View):
    def get(Self, request):
        return render(request, 'register.html')
    
class Login(View):
    def get(Self, request):
        form = LoginForm()
        return render(request, 'login.html', {'form':form})
    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, 'Logged in successfully')
                return redirect("backend:home")  # Redirect to home page after login
        return render(request, 'login.html', {'form':form})