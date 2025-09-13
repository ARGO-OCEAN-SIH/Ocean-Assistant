
from django.contrib import admin
from django.urls import path
from oceanassistantbackend import views, views_api
app_name = "backend"

urlpatterns = [
    path('home/', views.Home.as_view(), name='home'),
    path('register/', views.Register.as_view(), name='register'),
    path('login/', views.Login.as_view(), name='login'),
        path("api/voice/status/", views_api.get_voice_status),
    path("api/voice/control/", views_api.control_voice_engine),
    path("api/health/", views_api.health_check),
]