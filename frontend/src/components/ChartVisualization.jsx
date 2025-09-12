import React from 'react';
import { FaWater, FaChartLine } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';

const ChartVisualization = () => (
  <div className="w-full flex justify-center items-center min-h-[400px] bg-gradient-to-br from-blue-950 via-blue-800 to-cyan-700 rounded-xl shadow-2xl p-8 border border-blue-600/40 relative overflow-hidden group transition-all duration-300">
    <div className="absolute -top-24 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/30 to-blue-300/10 rounded-full blur-2xl z-0 animate-pulse" />
    <div className="relative z-10 w-full space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <FaWater className="text-cyan-300 text-xl drop-shadow-glowBlue" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-cyan-100 ml-1">
          Oceanic Depth-Time Insights
        </h2>
      </div>
      <p className="text-cyan-200 text-base md:text-lg mb-6 max-w-lg">
        Visualize and analyze salinity, temperature, and BGC trends from ARGO float sensor data. Gain scientific clarity with AI-powered comparisons.
      </p>
      <div className="bg-gradient-to-br from-blue-900 to-sky-700/80 shadow-inner rounded-lg flex flex-col items-center justify-center p-6 mb-8">
        <FaChartLine className="text-cyan-400 text-3xl mb-2" />
        <div className="w-full h-[240px] bg-blue-950 rounded transition-all ring-1 ring-cyan-400/20 flex items-center justify-center">
          <span className="text-cyan-300 font-medium text-lg animate-pulse">[Chart Visualization Placeholder]</span>
        </div>
        <div className="flex gap-4 mt-5">
          <Button
            size="sm"
            className="bg-cyan-600 text-white shadow-xl hover:bg-cyan-700 transition-all"
          >
            Download Data
          </Button>
          <Button
            size="sm"
            variant="outlined"
            className="border-cyan-400 text-cyan-200 hover:bg-cyan-900 hover:text-white"
          >
            Explore Salinity Trends
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap md:gap-4 gap-2">
        <div className="bg-gradient-to-tl from-blue-800 to-cyan-600 py-2 px-4 rounded shadow hover:scale-105 transition-all font-semibold text-cyan-100 border border-cyan-400/30 text-xs">
          Freshwater Profile<br/>Visualization
        </div>
        <div className="bg-gradient-to-tl from-sky-700 to-blue-700 py-2 px-4 rounded shadow hover:scale-105 transition-all font-semibold text-cyan-50 border border-cyan-300/30 text-xs">
          ARGO Seafloor<br/>Mapping
        </div>
        <div className="bg-gradient-to-tl from-cyan-500 to-blue-500 py-2 px-4 rounded shadow hover:scale-105 transition-all font-semibold text-cyan-50 border border-cyan-400/40 text-xs">
          Chlorophyll<br/>Trends
        </div>
      </div>
    </div>
  </div>
);

export default ChartVisualization;
