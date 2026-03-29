# setup_database.py
from sqlalchemy import create_engine, text

def setup_database():
    connection_string = "postgresql://postgres:7505625946@db.atmuzsddcwopzkgwwecz.supabase.co:5432/SIH_ARGO_DATABASE"
    
    print("Setting up database tables...")
    
    try:
        engine = create_engine(connection_string)
        
        with engine.connect() as conn:
            # Create the main table
            conn.execute(text("""
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
            """))
            print("✅ Table 'argo_measurements' created")
            
            # Create indexes
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_float_id ON argo_measurements(float_id)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_timestamp ON argo_measurements(timestamp)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_location ON argo_measurements(latitude, longitude)"))
            conn.execute(text("CREATE INDEX IF NOT EXISTS idx_pressure ON argo_measurements(pressure)"))
            print("✅ Indexes created")
            
        print("🎉 Database setup completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Setup failed: {e}")
        return False

if __name__ == "__main__":
    setup_database()