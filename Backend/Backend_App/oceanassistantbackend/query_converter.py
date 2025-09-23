# oceanassistantbackend/query_converter.py
import re
from .models import ArgoMeasurement

class ArgoQueryConverter:
    def __init__(self):
        self.float_patterns = {
            r'd\d+_prof_\d+': self._handle_float_id,
            r'float\s+(\w+)': self._handle_float_id,
            r'argo\s+float\s+(\w+)': self._handle_float_id
        }
        
        self.temperature_patterns = {
            r'warm\s+(?:waters?|ocean|areas?)': self._handle_warm_water,
            r'hot\s+(?:waters?|ocean|areas?)': self._handle_hot_water,
            r'cold\s+(?:waters?|ocean|areas?)': self._handle_cold_water,
            r'above\s+(\d+)\s*degrees?': self._handle_temperature_above,
            r'below\s+(\d+)\s*degrees?': self._handle_temperature_below,
            r'between\s+(\d+)\s*and\s*(\d+)\s*degrees?': self._handle_temperature_range
        }
        
        self.location_patterns = {
            r'north\s+atlantic': self._handle_north_atlantic,
            r'south\s+atlantic': self._handle_south_atlantic,
            r'north\s+pacific': self._handle_north_pacific,
            r'south\s+pacific': self._handle_south_pacific,
            r'indian\s+ocean': self._handle_indian_ocean,
            r'latitude\s+(\d+)\s*to\s*(\d+)': self._handle_latitude_range,
            r'longitude\s+(\d+)\s*to\s*(\d+)': self._handle_longitude_range
        }
        
        self.salinity_patterns = {
            r'high\s+salinity': self._handle_high_salinity,
            r'low\s+salinity': self._handle_low_salinity,
            r'salinity\s+above\s+(\d+)': self._handle_salinity_above,
            r'salinity\s+below\s+(\d+)': self._handle_salinity_below
        }

    def convert_query(self, natural_language_query):
        """Convert natural language to database query"""
        query = natural_language_query.lower()
        conditions = {}
        columns = ['float_id', 'latitude', 'longitude', 'temperature', 'salinity', 'timestamp']
        
        # Check for specific float ID
        for pattern, handler in self.float_patterns.items():
            match = re.search(pattern, query)
            if match:
                conditions.update(handler(match))
                columns = ['timestamp', 'pressure', 'temperature', 'salinity']
                break
        
        # Check temperature patterns
        for pattern, handler in self.temperature_patterns.items():
            match = re.search(pattern, query)
            if match:
                conditions.update(handler(match))
        
        # Check location patterns
        for pattern, handler in self.location_patterns.items():
            match = re.search(pattern, query)
            if match:
                conditions.update(handler(match))
        
        # Check salinity patterns
        for pattern, handler in self.salinity_patterns.items():
            match = re.search(pattern, query)
            if match:
                conditions.update(handler(match))
        
        # If no specific conditions, return recent data
        if not conditions:
            conditions = {'temperature__isnull': False}
        
        return {
            "table": "argo_measurements",
            "columns": columns,
            "conditions": conditions
        }

    # Pattern handlers - FIXED VERSION
    def _handle_float_id(self, match):
        if match.groups():
            float_id = match.group(1)
        else:
            float_id = match.group()
    
        # Convert to uppercase to match your database
        return {'float_id__iexact': float_id.upper()}

    def _handle_warm_water(self, match=None):
        return {'temperature__gt': 20}

    def _handle_hot_water(self, match=None):
        return {'temperature__gt': 25}

    def _handle_cold_water(self, match=None):
        return {'temperature__lt': 10}

    def _handle_temperature_above(self, match):
        return {'temperature__gt': float(match.group(1))}

    def _handle_temperature_below(self, match):
        return {'temperature__lt': float(match.group(1))}

    def _handle_temperature_range(self, match):
        return {'temperature__range': [float(match.group(1)), float(match.group(2))]}

    def _handle_north_atlantic(self, match=None):
        return {'latitude__gt': 40, 'longitude__lt': -20}

    def _handle_south_atlantic(self, match=None):
        return {'latitude__lt': -20, 'longitude__lt': -20}

    def _handle_north_pacific(self, match=None):
        return {'latitude__gt': 40, 'longitude__range': [-150, -90]}

    def _handle_south_pacific(self, match=None):
        return {'latitude__lt': -20, 'longitude__range': [-150, -90]}

    def _handle_indian_ocean(self, match=None):
        return {'longitude__range': [20, 120]}

    def _handle_latitude_range(self, match):
        return {'latitude__range': [float(match.group(1)), float(match.group(2))]}

    def _handle_longitude_range(self, match):
        return {'longitude__range': [float(match.group(1)), float(match.group(2))]}

    def _handle_high_salinity(self, match=None):
        return {'salinity__gt': 35}

    def _handle_low_salinity(self, match=None):
        return {'salinity__lt': 35}

    def _handle_salinity_above(self, match):
        return {'salinity__gt': float(match.group(1))}

    def _handle_salinity_below(self, match):
        return {'salinity__lt': float(match.group(1))}

# Global instance
query_converter = ArgoQueryConverter()