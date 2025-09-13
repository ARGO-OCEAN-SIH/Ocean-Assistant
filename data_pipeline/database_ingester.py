import os
import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

# Read DB configuration from environment variables
DB_CONFIG = {
    "username": os.getenv("DATA_DB_USER"),
    "password": os.getenv("DATA_DB_PASSWORD"),
    "host": os.getenv("DATA_DB_HOST", "localhost"),
    "port": int(os.getenv("DATA_DB_PORT", 5432)),
    "database": os.getenv("DATA_DB_NAME")
}

def create_database_engine():
    """Create SQLAlchemy engine for the analytical database."""
    connection_string = (
        f"postgresql://{DB_CONFIG['username']}:{DB_CONFIG['password']}"
        f"@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}"
    )
    return create_engine(connection_string)

def initialize_database():
    """Create the necessary table in the analytical database."""
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS argo_measurements (
        id SERIAL PRIMARY KEY,
        float_id VARCHAR(20),
        timestamp TIMESTAMP,
        latitude DOUBLE PRECISION,
        longitude DOUBLE PRECISION,
        pressure DOUBLE PRECISION,
        temperature DOUBLE PRECISION,
        salinity DOUBLE PRECISION,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_float_id ON argo_measurements(float_id);
    CREATE INDEX IF NOT EXISTS idx_timestamp ON argo_measurements(timestamp);
    CREATE INDEX IF NOT EXISTS idx_location ON argo_measurements(latitude, longitude);
    CREATE INDEX IF NOT EXISTS idx_pressure ON argo_measurements(pressure);
    """

    try:
        engine = create_database_engine()
        with engine.begin() as conn:  # begin() handles commit automatically
            conn.execute(text(create_table_sql))
        logger.info("Database table initialized successfully")
    except SQLAlchemyError as e:
        logger.error(f"Database initialization failed: {e}")
        raise

def ingest_dataframe_to_db(df: pd.DataFrame, table_name: str = "argo_measurements"):
    """Bulk inserts a DataFrame into the analytical database."""
    if df.empty:
        logger.warning("Attempted to ingest empty DataFrame")
        return

    try:
        engine = create_database_engine()
        with engine.begin() as conn:  # begin() handles commit automatically
            df.to_sql(
                name=table_name,
                con=conn,
                if_exists='append',
                index=False,
                method='multi',
                chunksize=1000
            )
        logger.info(f"Successfully ingested {len(df)} rows into {table_name}")
    except SQLAlchemyError as e:
        logger.error(f"Data ingestion failed: {e}")
        raise

if __name__ == "__main__":
    # Run this to initialize the database table
    initialize_database()
