# data_pipeline/metadata_extractor.py

import xarray as xr
from pathlib import Path
import json
from sentence_transformers import SentenceTransformer
import logging
from typing import Dict, Any

# Setup logging
logger = logging.getLogger(__name__)

# Load the embedding model once and reuse across calls (efficient)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def extract_metadata(nc_file_path: Path) -> Dict[str, Any]:
    """
    Extracts metadata from a NetCDF file for vector database storage.
    Args:
        nc_file_path (Path): Path to the NetCDF file
    Returns:
        dict: Metadata dictionary with core information
    """
    try:
        # Open NetCDF file safely with context manager
        with xr.open_dataset(nc_file_path) as ds:

            # Utility to fetch attributes safely (fallback to default if missing)
            def safe_get_attr(obj, key, default=""):
                return str(getattr(obj, key, default))

            # Handle float_id properly (avoid xarray DataArray)
            if "PLATFORM_NUMBER" in ds:
                try:
                    float_id = str(ds["PLATFORM_NUMBER"].values[0])
                except Exception:
                    float_id = "unknown"
            else:
                float_id = "unknown"

            # Base metadata dictionary
            metadata = {
                "file_name": nc_file_path.name,  # File name
                "float_id": float_id,  # ✅ Clean string float ID
                "date_created": safe_get_attr(ds, "DATE_CREATION", ""),  # Creation date
                "time_coverage_start": safe_get_attr(ds, "TIME_COVERAGE_START", ""),  # Start time
                "time_coverage_end": safe_get_attr(ds, "TIME_COVERAGE_END", ""),  # End time
                "geographical_region": "Global",  # Placeholder (could be improved later)
                "parameters_measured": [],  # Will fill from dataset
                "data_resolution": "Irregular",  # Default assumption
                "depth_range": "",  # Placeholder (calculated if PRES exists)
            }

            # Depth range (only if pressure variable exists in dataset)
            if "PRES" in ds:
                try:
                    min_depth = float(ds["PRES"].min())
                    max_depth = float(ds["PRES"].max())
                    metadata["depth_range"] = f"{min_depth:.1f} to {max_depth:.1f} m"
                except Exception:
                    metadata["depth_range"] = ""

            # Parameters measured (TEMP, PSAL, DOXY, CHLA if present)
            possible_params = ["TEMP", "PSAL", "DOXY", "CHLA"]
            for param in possible_params:
                if param in ds.variables:
                    metadata["parameters_measured"].append(param)

            # ✅ Convert list → comma-separated string for DB safety
            metadata["parameters_measured"] = ", ".join(metadata["parameters_measured"])

            return metadata

    except Exception as e:
        # Log error and return empty dict if file processing fails
        logger.error(f"Error extracting metadata from {nc_file_path}: {e}")
        return {}


def generate_embedding(metadata: Dict[str, Any]) -> list:
    """
    Generate an embedding vector for the metadata text.
    Args:
        metadata (dict): Extracted metadata dictionary
    Returns:
        list: Embedding vector as list of floats
    """
    # Create human-readable text from metadata for embedding
    text_for_embedding = f"""
    Float {metadata.get('float_id', 'unknown')} measuring {metadata.get('parameters_measured', '')}.
    Data from {metadata.get('time_coverage_start', '')} to {metadata.get('time_coverage_end', '')}.
    Depth range: {metadata.get('depth_range', '')}.
    """.strip()

    # Encode using SentenceTransformer model
    embedding = embedding_model.encode(text_for_embedding)

    # Convert NumPy array → Python list (JSON serializable)
    return embedding.tolist()


def process_metadata_for_vector_db(nc_file_path: Path) -> Dict[str, Any]:
    """
    Full processing pipeline:
    - Extract metadata
    - Generate embedding
    - Prepare metadata text for vector DB
    Args:
        nc_file_path (Path): Path to NetCDF file
    Returns:
        dict: Metadata dictionary with embedding + metadata_text
    """
    metadata = extract_metadata(nc_file_path)
    if not metadata:
        return {}

    # Add embedding to metadata
    metadata["embedding"] = generate_embedding(metadata)

    # Store metadata as JSON string for Chroma's "documents" field
    metadata["metadata_text"] = json.dumps(metadata, default=str)

    return metadata
