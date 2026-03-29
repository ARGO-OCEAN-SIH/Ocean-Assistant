import React from 'react';
import ChatWindow from '../components/ChatWindow';
import MapVisualization from '../components/MapVisualization';
import ChartVisualization from '../components/ChartVisualization';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content grid */}
      <main className="flex-1 grid grid-cols-1 pt-20 lg:grid-cols-2 gap-6 p-6">
        
        {/* Chat Section */}
        <section className="flex flex-col bg-gray-900/70 rounded-2xl shadow-lg p-4">
          <div className="flex-1 overflow-hidden">
            <ChatWindow />
          </div>
        </section>

        {/* Visualizations */}
        <section className="flex flex-col gap-6">
          {/* Map */}
          <div className="bg-gray-900/70 rounded-2xl shadow-lg p-4 flex-1">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Map</h2>
            <MapVisualization />
          </div>

          {/* Chart */}
          <div className="bg-gray-900/70 rounded-2xl shadow-lg p-4 flex-1">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-2">Analytics</h2>
            <ChartVisualization />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-800 text-sm">
        © 2025 Ocean Assistant | Powered by ARGO & AI
      </footer>
    </div>
  );
};

export default Dashboard;
