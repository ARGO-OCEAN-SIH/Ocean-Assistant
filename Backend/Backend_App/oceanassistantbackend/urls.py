from django.urls import path
from . import views, views_api

app_name = 'backend'

urlpatterns = [
    path('home/', views.Home.as_view(), name='home'),
    path('register/', views.Register.as_view(), name='register'),
    path('login/', views.Login.as_view(), name='login'),
    path('process-voice/', views.process_voice, name='process_voice'),
    path('ai-status/', views.ai_status, name='ai_status'),
    path('test/', views.Test.as_view(), name='test'),

    # Existing API endpoints
    path('api/root/', views_api.root, name='api_root'),
    path('api/voice-status/', views_api.get_voice_status, name='voice_status'),
    path('api/control-voice/', views_api.control_voice_engine, name='control_voice'),
    path('api/health-check/', views_api.health_check, name='health_check'),
    path('api/process_query/', views_api.process_query, name='process_query'),

    # NEW: Fetch Argo Measurements
# urls.py
path('api/fetch-argo-data/', views_api.fetch_argo_data, name='fetch_argo_data'),

]
