import React from 'react';
import ChatWindow from '../components/ChatWindow';
import MapVisualization from '../components/MapVisualization';
import ChartVisualization from '../components/ChartVisualization';

const Home = ({ onSwitchToVoice }) => (
  <div className="w-full min-h-screen bg-gradient-to-br from-blue-950 via-blue-900/80 to-cyan-950 px-2 md:px-0 flex flex-col items-center justify-between relative overflow-x-hidden font-montserrat">
    <header className="w-full max-w-7xl mx-auto flex flex-col items-center text-center py-10 z-20">
      <h1 className="text-4xl md:text-5xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-glowBlue mt-4">
        Ocean AI Data Dashboard
      </h1>
      <p className="mt-2 text-cyan-100 text-lg md:text-2xl font-medium tracking-wide max-w-2xl mx-auto">
        Explore ocean depths and marine analytics with futuristic conversational AI, interactive maps, and live chart insights.
      </p>
      <button
        className="mt-6 px-7 py-3 rounded-xl flex items-center gap-2 bg-gradient-to-br from-cyan-600 via-blue-600 to-sky-600 text-white font-bold text-lg shadow-xl hover:bg-cyan-700 hover:scale-105 active:scale-95 transition-all border border-cyan-400/40"
        onClick={onSwitchToVoice}
      >
        <span className="text-2xl">🎙️</span> Switch to Voice Assistant Mode
      </button>
    </header>
    <main className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-2 pb-8 z-10">
      <section className="flex flex-col items-center justify-start md:min-h-[540px]">
        <ChatWindow />
      </section>
      <section className="flex flex-col gap-8">
        <div className="w-full">
          <MapVisualization />
        </div>
        <div className="w-full">
          <ChartVisualization />
        </div>
      </section>
    </main>
    <footer className="w-full flex justify-center items-center py-4 mt-auto bg-gradient-to-t from-blue-950/90 to-transparent text-cyan-400 text-sm font-semibold tracking-wide border-t border-cyan-700/30">
      © 2025 Ocean AI Dashboard | Powered by ARGO & Conversational Intelligence
    </footer>
    <span className="pointer-events-none fixed -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-600/40 to-transparent blur-3xl opacity-60 z-0" />
  </div>
);

export default Home;
