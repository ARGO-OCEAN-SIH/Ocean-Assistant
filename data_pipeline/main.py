#!/usr/bin/env python3
"""
Main orchestrator for the Argo data processing pipeline.
Processes local NetCDF files and ingests them into analytical and vector databases.
Run with: python -m data_pipeline.main
"""

import logging
from pathlib import Path
from data_pipeline.netcdf_processor import process_directory
from data_pipeline.database_ingester import initialize_database, ingest_dataframe_to_db
from data_pipeline.vector_db_ingester import initialize_chroma_db, ingest_metadata_to_vector_db
from data_pipeline.config import RAW_DATA_DIR

# ------------------------------
# Setup logging
# ------------------------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ------------------------------
# Main pipeline
# ------------------------------
def run_pipeline():
    logger.info("Starting Argo data processing pipeline")

    # Check for local NetCDF files
    nc_files = list(RAW_DATA_DIR.glob("*.nc"))
    logger.info(f"Looking for NetCDF files in {RAW_DATA_DIR}")
    logger.info(f"Found {len(nc_files)} files: {[f.name for f in nc_files]}")

    if not nc_files:
        logger.error("No NetCDF files found to process. Please add .nc files to the directory.")
        return False

    # Step 1: Initialize databases
    logger.info("Initializing analytical database...")
    initialize_database()

    logger.info("Initializing vector database...")
    chroma_collection = initialize_chroma_db()

    # Step 2: Process NetCDF files into DataFrame
    logger.info("Processing NetCDF files...")
    combined_df = process_directory(RAW_DATA_DIR)

    if combined_df.empty:
        logger.error("No data was processed successfully from the NetCDF files")
        return False

    # Step 3: Ingest into analytical database
    logger.info(f"Ingesting {len(combined_df)} measurements into analytical database...")
    ingest_dataframe_to_db(combined_df)

    # Step 4: Ingest metadata into vector database
    logger.info("Ingesting metadata into vector database...")
    success_count = 0
    for nc_file in nc_files:
        if ingest_metadata_to_vector_db(nc_file, chroma_collection):
            success_count += 1

    logger.info(f"Pipeline completed successfully. Processed {success_count}/{len(nc_files)} files.")
    logger.info(f"Total measurements ingested: {len(combined_df)}")
    return True


# ------------------------------
# Entry point
# ------------------------------
if __name__ == "__main__":
    try:
        success = run_pipeline()
        exit(0 if success else 1)
    except Exception as e:
        logger.exception("Pipeline failed with error")
        exit(1)
