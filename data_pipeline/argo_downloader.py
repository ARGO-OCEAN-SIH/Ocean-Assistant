import requests
from pathlib import Path
import logging
from .config import RAW_DATA_DIR

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def download_argo_file(float_id: str, file_url: str) -> Path:
    """
    Downloads a single NetCDF file for a specific Argo float.
    """
    try:
        local_filename = f"{float_id}.nc"
        local_path = RAW_DATA_DIR / local_filename
        
        # Skip if already downloaded
        if local_path.exists():
            logger.info(f"File already exists: {local_filename}")
            return local_path
        
        logger.info(f"Downloading {file_url}")
        response = requests.get(file_url, stream=True)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        with open(local_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        logger.info(f"Successfully downloaded to {local_path}")
        return local_path
        
    except Exception as e:
        logger.error(f"Failed to download {file_url}: {str(e)}")
        raise

# For the hackathon, we'll use a pre-defined list of sample files
SAMPLE_FILES = {
    "4902587": "https://data-argo.ifremer.fr/argo/dac/aoml/4902587/4902587_prof.nc",
    "5903246": "https://data-argo.ifremer.fr/argo/dac/aoml/5903246/5903246_prof.nc"
}

def download_sample_data():
    """Download sample files for the hackathon."""
    downloaded_paths = []
    for float_id, url in SAMPLE_FILES.items():
        try:
            path = download_argo_file(float_id, url)
            downloaded_paths.append(path)
        except Exception as e:
            logger.error(f"Failed to download sample data for {float_id}: {e}")
    
    return downloaded_paths