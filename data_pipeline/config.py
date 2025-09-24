import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"

# Database connection string (for the Analytical Database)
DB_CONFIG = {
    "drivername": "postgresql",
    "username": os.getenv("ANALYTICAL_DB_USER", "postgres"),
    "password": os.getenv("ANALYTICAL_DB_PASSWORD", "password"),
    "host": os.getenv("ANALYTICAL_DB_HOST", "localhost"),
    "port": os.getenv("ANALYTICAL_DB_PORT", "5432"),
    "database": os.getenv("ANALYTICAL_DB_NAME", "argo_ai_data"),
}

# Target Argo data source
ARGO_DATA_SOURCE = "https://data-argo.ifremer.fr/argo/dac/aoml/"

# Create directories if they don't exist
RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)



# import os
# from pathlib import Path
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# # Base directories
# BASE_DIR = Path(__file__).resolve().parent.parent
# DATA_DIR = BASE_DIR / "data"
# RAW_DATA_DIR = DATA_DIR / "raw"
# PROCESSED_DATA_DIR = DATA_DIR / "processed"

# # Supabase Database configuration
# DB_CONFIG = {
#     "drivername": "postgresql",
#     "username": os.getenv("ANALYTICAL_DB_USER", "postgres"),
#     "password": os.getenv("ANALYTICAL_DB_PASSWORD", ""),
#     "host": os.getenv("ANALYTICAL_DB_HOST", "db.jrpognwucnkfylzkkcca.supabase.co"),
#     "port": os.getenv("ANALYTICAL_DB_PORT", "5432"),
#     "database": os.getenv("ANALYTICAL_DB_NAME", "postgres"),
#     "query": {"sslmode": "require"}
# }

# # Alternative: Direct connection string
# SUPABASE_DATABASE_URL = os.getenv("SUPABASE_DATABASE_URL")

# # Supabase API configuration (if you need REST API access)
# SUPABASE_URL = os.getenv("SUPABASE_URL", "https://jrpognwucnkfylzkkcca.supabase.co")
# SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycG9nbnd1Y25rZnlsemtrY2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MTg3MjMsImV4cCI6MjA3NDE5NDcyM30.W7x0Wla_vD7269ADmFBuav1fuJazYNId6ds-hOvGf3M")

# # Target Argo data source
# ARGO_DATA_SOURCE = "https://data-argo.ifremer.fr/argo/dac/aoml/"

# # Create directories if they don't exist
# RAW_DATA_DIR.mkdir(parents=True, exist_ok=True)
# PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)