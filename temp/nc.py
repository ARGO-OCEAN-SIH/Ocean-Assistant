import xarray as xr
import pandas as pd
from pathlib import Path
import numpy as np

nc_file = Path("C:/Users/dhruv/OneDrive/Desktop/Ocean-Assistant/data/raw/D20250606_prof_0.nc")
ds = xr.open_dataset(nc_file)

# Extract dimensions
n_prof = ds.dims.get("N_PROF", 1)
n_levels = ds.dims.get("N_LEVELS", 1)

# Flatten pressure, temperature, salinity
pressure = ds["PRES"].values.flatten() if "PRES" in ds else np.full(n_prof*n_levels, np.nan)
temperature = ds["TEMP"].values.flatten() if "TEMP" in ds else np.full(n_prof*n_levels, np.nan)
salinity = ds["PSAL"].values.flatten() if "PSAL" in ds else np.full(n_prof*n_levels, np.nan)

# Broadcast latitude, longitude, timestamp to match flattened data
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

print("DataFrame created successfully!")
print(df.head())
print(f"Total rows: {len(df)}")

ds.close()
