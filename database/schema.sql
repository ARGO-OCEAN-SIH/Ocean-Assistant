-- database/schema.sql
-- This script creates the main table for Argo float measurements.
-- It will be run against the 'argo_ai_data' database.

CREATE TABLE IF NOT EXISTS argo_measurements (
    id SERIAL PRIMARY KEY,
    float_id VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    pressure DOUBLE PRECISION NOT NULL,
    temperature DOUBLE PRECISION,
    salinity DOUBLE PRECISION,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for fast querying on common filters
CREATE INDEX IF NOT EXISTS idx_argo_float_id ON argo_measurements(float_id);
CREATE INDEX IF NOT EXISTS idx_argo_timestamp ON argo_measurements(timestamp);
CREATE INDEX IF NOT EXISTS idx_argo_location ON argo_measurements(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_argo_pressure ON argo_measurements(pressure);
COMMENT ON TABLE argo_measurements IS 'Stores processed measurement data from Argo float NetCDF files.';

--
-- Table for user authentication and data storage
--

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add an index for faster lookups on email, which is often used for login
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
COMMENT ON TABLE users IS 'Stores user account information for authentication.';