
from django.contrib import admin
from django.urls import path
from oceanassistantbackend import views
app_name = "backend"

urlpatterns = [
    path('home/', views.Home.as_view(), name='home'),
    path('register/', views.Register.as_view(), name='register'),
    path('login/', views.Login.as_view(), name='login')
]