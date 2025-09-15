import React from 'react';
import ChatWindow from '../components/ChatWindow';
import MapVisualization from '../components/MapVisualization';
import ChartVisualization from '../components/ChartVisualization';
import Navbar from './navbar';

const Home = ({ onSwitchToVoice }) => (
  <div className="home-page sci-fi-bg">
    
      {/* <Navbar/>
    */}
    <header className="sci-fi-header mt-5 pt-5">
      <h1 className="sci-fi-title">🌌 Ocean Assistant</h1>
      <p className="sci-fi-subtitle">Explore the depths with futuristic AI</p>
      <button className="voice-mode-btn" onClick={onSwitchToVoice}>
        🎙️ Switch to Voice Assistant Mode
      </button>
    </header>
    <main className="sci-fi-main-grid">
      <section className="sci-fi-chat-section">
        <ChatWindow />
      </section>
      <section className="sci-fi-visual-section">
        <div className="map-area">
          <MapVisualization />
        </div>
        <div className="chart-area">
          <ChartVisualization />
        </div>
      </section>
    </main>
    <footer className="sci-fi-footer">
      <span>© 2025 Ocean Assistant | Powered by ARGO & AI</span>
    </footer>
  </div>
);

export default Home;
