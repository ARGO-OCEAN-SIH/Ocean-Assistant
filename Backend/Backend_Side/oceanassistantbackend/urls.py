from django.urls import path
from . import views

app_name = 'backend'

urlpatterns = [
    path('home/', views.Home.as_view(), name='home'),
    path('register/', views.Register.as_view(), name='register'),
    path('login/', views.Login.as_view(), name='login'),
    path('process-voice/', views.process_voice, name='process_voice'),
    path('ai-status/', views.ai_status, name='ai_status'),
    path('test/', views.Test.as_view(), name='test')
]