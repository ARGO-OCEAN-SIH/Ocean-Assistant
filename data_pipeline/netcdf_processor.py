# data_pipeline/netcdf_processor.py

import xarray as xr
import pandas as pd
from pathlib import Path
import logging
import numpy as np

logger = logging.getLogger(__name__)

# Columns mapping for DB
DB_COLUMNS = ["float_id", "timestamp", "latitude", "longitude", "pressure", "temperature", "salinity"]

def netcdf_to_dataframe(nc_file: Path) -> pd.DataFrame:
    """
    Convert a single NetCDF file to a flat DataFrame with relevant columns.
    """
    try:
        logger.info(f"Processing {nc_file.name}")
        ds = xr.open_dataset(nc_file)

        # Extract dimensions
        n_prof = ds.dims.get("N_PROF", 1)
        n_levels = ds.dims.get("N_LEVELS", 1)

        # Flatten 2D variables
        pressure = ds["PRES"].values.flatten() if "PRES" in ds else np.full(n_prof*n_levels, np.nan)
        temperature = ds["TEMP"].values.flatten() if "TEMP" in ds else np.full(n_prof*n_levels, np.nan)
        salinity = ds["PSAL"].values.flatten() if "PSAL" in ds else np.full(n_prof*n_levels, np.nan)

        # Broadcast 1D coordinates
        latitude = np.repeat(ds["LATITUDE"].values, n_levels) if "LATITUDE" in ds else np.full(n_prof*n_levels, np.nan)
        longitude = np.repeat(ds["LONGITUDE"].values, n_levels) if "LONGITUDE" in ds else np.full(n_prof*n_levels, np.nan)
        timestamp = np.repeat(ds["JULD"].values, n_levels) if "JULD" in ds else np.full(n_prof*n_levels, np.nan)

        # Float ID
        float_id = np.repeat(nc_file.stem, n_prof*n_levels)

        # Create DataFrame
        df = pd.DataFrame({
            "float_id": float_id,
            "timestamp": timestamp,
            "latitude": latitude,
            "longitude": longitude,
            "pressure": pressure,
            "temperature": temperature,
            "salinity": salinity
        })

        # Drop rows with missing essential data
        df = df.dropna(subset=["latitude", "longitude", "pressure", "temperature", "salinity"])

        logger.info(f"Processed {len(df)} rows from {nc_file.name}")
        return df

    except Exception as e:
        logger.error(f"Error processing {nc_file.name}: {e}")
        return pd.DataFrame()
    finally:
        if 'ds' in locals():
            ds.close()


def process_directory(nc_dir: Path) -> pd.DataFrame:
    """
    Process all NetCDF files in a directory and return a combined DataFrame.
    """
    all_dfs = []
    nc_files = list(nc_dir.glob("*.nc"))
    if not nc_files:
        logger.warning(f"No NetCDF files found in {nc_dir}")
        return pd.DataFrame()

    for nc_file in nc_files:
        df = netcdf_to_dataframe(nc_file)
        if not df.empty:
            all_dfs.append(df)
        else:
            logger.warning(f"No data processed for {nc_file.name}")

    if all_dfs:
        combined_df = pd.concat(all_dfs, ignore_index=True)
        # Reorder columns to match DB
        combined_df = combined_df[DB_COLUMNS]
        logger.info(f"Total rows processed from {len(nc_files)} files: {len(combined_df)}")
        return combined_df

    logger.warning("No data was processed successfully from any file.")
    return pd.DataFrame()
