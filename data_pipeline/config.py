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