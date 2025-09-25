// OceanDataCard.jsx (You could place this in a separate file or directly inside ChatWindow.jsx)

import React from 'react';

const OceanDataCard = ({ text }) => {
  const parseData = (dataText) => {
    const data = {};
    const lines = dataText.split('\n');

    // Simple parsing to extract the values
    lines.forEach(line => {
      if (line.includes('**Location**')) {
        data.location = line.split('**Location**: ')[1].trim();
      } else if (line.includes('**Temperature**')) {
        data.temperature = line.split('**Temperature**: ')[1].trim();
      } else if (line.includes('**Salinity**')) {
        data.salinity = line.split('**Salinity**: ')[1].trim();
      }
    });

    const measurementsMatch = dataText.match(/Found \*\*(\d+)/);
    data.measurements = measurementsMatch ? measurementsMatch[1] : 'N/A';
    data.source = lines[lines.length - 1].split('*Based on ')[1].replace('*', '');

    return data;
  };

  const parsedData = parseData(text);

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md text-gray-100 max-w-[70%]">
      <div className="flex items-center text-blue-400 font-bold text-lg mb-2">
        <span role="img" aria-label="ocean-icon" className="mr-2 text-2xl">🌊</span>
        Ocean Data Analysis
      </div>
      <p className="text-gray-300 text-sm mb-3">
        Found <span className="font-extrabold text-white">{parsedData.measurements}</span> measurements matching your query.
      </p>
      <div className="space-y-1 text-sm">
        <div className="flex items-center">
          <span className="font-bold">Location</span>: {parsedData.location} <span role="img" aria-label="location-pin" className="ml-1">📍</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Temperature</span>: {parseFloat(parsedData.temperature).toFixed(2)} °C <span role="img" aria-label="thermometer" className="ml-1">🌡️</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Salinity</span>: {parseFloat(parsedData.salinity).toFixed(2)} PSU <span role="img" aria-label="salt" className="ml-1">🧂</span>
        </div>
      </div>
      <hr className="border-gray-700 my-3" />
      <p className="text-xs italic text-gray-400">
        *Based on {parsedData.source}*
      </p>
    </div>
  );
};

export default OceanDataCard;