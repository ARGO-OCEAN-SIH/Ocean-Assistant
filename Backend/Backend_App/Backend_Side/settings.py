"""
Django settings for Backend_Side project.
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
load_dotenv()

# Quick-start development settings
SECRET_KEY = 'django-insecure-^*72)t7fdk4mq3_ijcpy9^d&l!)7l+$a)%w=(!c7krp+%5+ul-'
DEBUG = True
ALLOWED_HOSTS = []

# API Keys
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')

# Application definition
INSTALLED_APPS = [
    "corsheaders",
    "rest_framework",
    "channels",
    'oceanassistantbackend',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Backend_Side.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Backend_Side.wsgi.application'
ASGI_APPLICATION = "Backend_Side.asgi.application"
CORS_ALLOW_ALL_ORIGINS = True 
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    }
}

# Database configuration - SQLite for Django app, PostgreSQL for technical data
DATABASES = {
    # Default database (SQLite for Django auth, sessions, etc.)
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
    # Data database (PostgreSQL for Argo measurements and technical knowledge)
    'data': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DATA_DB_NAME', 'argo_ai_data'),
        'USER': os.environ.get('DATA_DB_USER', 'postgres'),
        'PASSWORD': os.environ.get('DATA_DB_PASSWORD', '2005'),
        'HOST': os.environ.get('DATA_DB_HOST', 'localhost'),
        'PORT': os.environ.get('DATA_DB_PORT', '5432'),
    }
}

# Database router to handle multiple databases
DATABASE_ROUTERS = ['Backend_Side.database_routers.DatabaseRouter']

AUTH_USER_MODEL = "oceanassistantbackend.CustomUser"

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1', 
    'testserver',  # ADD THIS LINE
]