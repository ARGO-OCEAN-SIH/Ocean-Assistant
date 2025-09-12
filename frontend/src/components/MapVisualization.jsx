import React from 'react';
import { FaGlobeAsia } from 'react-icons/fa';

const MapVisualization = () => (
  <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-950 via-sky-900/60 to-cyan-900/80 shadow-2xl rounded-2xl border border-cyan-700/50 p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-lg">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-radial from-cyan-400/30 to-transparent blur-3xl opacity-60 pointer-events-none" />
    <div className="flex items-center gap-3 mb-3 z-10">
      <FaGlobeAsia className="text-cyan-300 text-3xl animate-pulse" />
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-wider text-cyan-100 drop-shadow-lg">
        AI Ocean Map Explorer
      </h2>
    </div>
    <p className="text-cyan-200 text-base md:text-lg mb-5 max-w-xl text-center z-10">
      Interactively visualize ARGO float deployments, BGC trends, and geospatial datasets across global marine ecosystems.
    </p>
    <div className="w-full h-[300px] bg-blue-950/80 rounded-lg border border-cyan-500/10 flex items-center justify-center shadow-inner ring-1 ring-cyan-300/20 backdrop-blur-lg">
      <span className="text-cyan-300 text-lg font-medium animate-pulse">[Map Visualization Area]</span>
    </div>
    <div className="flex gap-4 mt-6 z-10">
      <button className="px-5 py-2 rounded bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold shadow-md hover:scale-105 hover:bg-cyan-700 transition-all">Show ARGO Locations</button>
      <button className="px-5 py-2 rounded border border-cyan-400 text-cyan-100 bg-transparent font-semibold hover:bg-cyan-900/70 hover:text-white transition-all">Switch View</button>
    </div>
  </div>
);

export default MapVisualization;
