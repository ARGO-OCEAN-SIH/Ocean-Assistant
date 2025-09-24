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








# # new code 
# import os
# import pandas as pd
# from sqlalchemy import create_engine, text
# from sqlalchemy.exc import SQLAlchemyError
# import logging
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO)

# # Read DB configuration from environment variables with Supabase defaults
# DB_CONFIG = {
#     "username": os.getenv("DATA_DB_USER", "postgres"),
#     "password": os.getenv("DATA_DB_PASSWORD", ""),
#     "host": os.getenv("DATA_DB_HOST", "db.jrpognwucnkfylzkkcca.supabase.co"),
#     "port": int(os.getenv("DATA_DB_PORT", "5432")),
#     "database": os.getenv("DATA_DB_NAME", "postgres")
# }

# def create_database_engine():
#     """Create SQLAlchemy engine for Supabase with SSL support."""
#     connection_string = (
#         f"postgresql://{DB_CONFIG['username']}:{DB_CONFIG['password']}"
#         f"@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}"
#     )
    
#     # Add SSL configuration for Supabase
#     engine = create_engine(
#         connection_string,
#         connect_args={
#             'sslmode': 'require'
#         },
#         pool_pre_ping=True,  # Verify connection before use
#         echo=False  # Set to True for debugging SQL queries
#     )
#     return engine

# def initialize_database():
#     """Create the necessary table in Supabase database."""
#     create_table_sql = """
#     CREATE TABLE IF NOT EXISTS argo_measurements (
#         id SERIAL PRIMARY KEY,
#         float_id VARCHAR(20),
#         timestamp TIMESTAMP,
#         latitude DOUBLE PRECISION,
#         longitude DOUBLE PRECISION,
#         pressure DOUBLE PRECISION,
#         temperature DOUBLE PRECISION,
#         salinity DOUBLE PRECISION,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#     );

#     CREATE INDEX IF NOT EXISTS idx_float_id ON argo_measurements(float_id);
#     CREATE INDEX IF NOT EXISTS idx_timestamp ON argo_measurements(timestamp);
#     CREATE INDEX IF NOT EXISTS idx_location ON argo_measurements(latitude, longitude);
#     CREATE INDEX IF NOT EXISTS idx_pressure ON argo_measurements(pressure);
#     """

#     try:
#         engine = create_database_engine()
#         with engine.begin() as conn:
#             conn.execute(text(create_table_sql))
#         logger.info("Supabase database table initialized successfully")
#     except SQLAlchemyError as e:
#         logger.error(f"Database initialization failed: {e}")
#         raise

# def ingest_dataframe_to_db(df: pd.DataFrame, table_name: str = "argo_measurements"):
#     """Bulk inserts a DataFrame into Supabase database."""
#     if df.empty:
#         logger.warning("Attempted to ingest empty DataFrame")
#         return

#     try:
#         engine = create_database_engine()
#         with engine.begin() as conn:
#             df.to_sql(
#                 name=table_name,
#                 con=conn,
#                 if_exists='append',
#                 index=False,
#                 method='multi',
#                 chunksize=1000
#             )
#         logger.info(f"Successfully ingested {len(df)} rows into {table_name}")
#     except SQLAlchemyError as e:
#         logger.error(f"Data ingestion failed: {e}")
#         raise

# def test_connection():
#     """Test the connection to Supabase database."""
#     try:
#         engine = create_database_engine()
#         with engine.connect() as conn:
#             result = conn.execute(text("SELECT version();"))
#             version = result.scalar()
#             logger.info(f"Connected to Supabase PostgreSQL: {version}")
#             return True
#     except SQLAlchemyError as e:
#         logger.error(f"Connection test failed: {e}")
#         return False

# def get_table_info():
#     """Get information about the argo_measurements table."""
#     try:
#         engine = create_database_engine()
#         with engine.connect() as conn:
#             # Check if table exists and get row count
#             result = conn.execute(text("""
#                 SELECT COUNT(*) as row_count 
#                 FROM information_schema.tables 
#                 WHERE table_name = 'argo_measurements'
#             """))
#             table_exists = result.scalar() > 0
            
#             if table_exists:
#                 result = conn.execute(text("SELECT COUNT(*) FROM argo_measurements"))
#                 row_count = result.scalar()
#                 logger.info(f"Table 'argo_measurements' exists with {row_count} rows")
#                 return row_count
#             else:
#                 logger.info("Table 'argo_measurements' does not exist yet")
#                 return 0
#     except SQLAlchemyError as e:
#         logger.error(f"Table info query failed: {e}")
#         return -1

# if __name__ == "__main__":
#     # Test connection first
#     if test_connection():
#         logger.info("✅ Connection to Supabase successful!")
        
#         # Initialize the database table
#         initialize_database()
        
#         # Get table information
#         get_table_info()
        
#         # Example: Test with a small DataFrame
#         test_df = pd.DataFrame({
#             'float_id': ['test_float_001'],
#             'timestamp': [pd.Timestamp.now()],
#             'latitude': [40.7128],
#             'longitude': [-74.0060],
#             'pressure': [10.5],
#             'temperature': [15.3],
#             'salinity': [35.1]
#         })
        
#         try:
#             ingest_dataframe_to_db(test_df)
#             logger.info("✅ Test data ingestion successful!")
#         except:
#             logger.warning("Test data ingestion failed (table might already have data)")
#     else:
#         logger.error("❌ Failed to connect to Supabase. Check your .env configuration.")
