import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMic, FiPower, FiRefreshCw, FiBell } from 'react-icons/fi';

const VoiceIntegration = () => {
  const [voiceStatus, setVoiceStatus] = useState({
    is_running: false,
    is_awake: false,
    status: 'inactive'
  });
  const [isConnected, setIsConnected] = useState(false);
  const API_BASE = 'http://localhost:8000';

  // Check voice engine status
  const checkStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/voice/status`);
      setVoiceStatus(response.data);
    } catch (error) {
      console.error('Error checking voice status:', error);
    }
  };
  // Start voice engine
  const startVoiceEngine = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/voice/control`, {
        action: 'start'
      });
      setVoiceStatus(prev => ({ ...prev, ...response.data }));
    } catch (error) {
      console.error('Error starting voice engine:', error);
    }
  };
  // Stop voice engine
  const stopVoiceEngine = async () => {
    try {
      const response = await axios.post(`${API_BASE}/api/voice/control`, {
        action: 'stop'
      });
      setVoiceStatus(prev => ({ ...prev, ...response.data }));
    } catch (error) {
      console.error('Error stopping voice engine:', error);
    }
  };
  // Test wake word response
  const testWakeWord = async () => {
    try {
      await axios.post(`${API_BASE}/api/voice/wake-word-test`);
    } catch (error) {
      console.error('Error testing wake word:', error);
    }
  };

  // WebSocket connection for real-time updates
  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8000/ws/voice');
      
      ws.onopen = () => {
        setIsConnected(true);
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setVoiceStatus(data);
      };
      ws.onclose = () => {
        setIsConnected(false);
        setTimeout(connectWebSocket, 2000);
      };
      ws.onerror = () => {};
      return ws;
    };
    const ws = connectWebSocket();
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-br from-sky-950 via-blue-900/70 to-cyan-900/70 shadow-2xl rounded-3xl border border-cyan-700/40 p-7 md:p-10 glass backdrop-blur-3xl mt-7 mb-7">
      <h3 className="text-2xl font-black tracking-wider text-cyan-200 mb-6 flex items-center gap-2">
        <FiMic className="text-cyan-400 text-2xl" /> Voice Engine Integration
      </h3>
      <div className="flex flex-wrap gap-5 items-center mb-6">
        <div className={`flex items-center py-2 px-4 rounded-2xl text-base font-semibold shadow
          ${voiceStatus.is_running ? "bg-gradient-to-r from-green-700/70 to-green-400/30 text-green-200 border border-green-400/40" : "bg-gradient-to-r from-blue-800 to-slate-900/40 text-cyan-300 border border-cyan-700/50"}
        `}>
          <span className={`w-3 h-3 rounded-full mr-2 shadow ${voiceStatus.is_running ? "bg-green-400 animate-pulse" : "bg-gray-400"}`} />
          Engine: {voiceStatus.is_running ? 'RUNNING' : 'STOPPED'}
        </div>
        <div className={`flex items-center py-2 px-4 rounded-2xl text-base font-semibold shadow
          ${voiceStatus.is_awake ? "bg-gradient-to-r from-cyan-500/70 to-blue-400/30 text-cyan-100 border border-cyan-400/30" : "bg-gradient-to-r from-blue-800 to-slate-900/40 text-cyan-300 border border-cyan-700/50"}
        `}>
          <span className={`w-3 h-3 rounded-full mr-2 shadow ${voiceStatus.is_awake ? "bg-cyan-400 animate-pulse" : "bg-gray-400"}`} />
          State: {voiceStatus.is_awake ? 'AWAKE' : 'SLEEPING'}
        </div>
        <div className={`flex items-center py-2 px-4 rounded-2xl text-base font-semibold shadow
          ${isConnected ? "bg-gradient-to-r from-blue-400/60 to-sky-400/30 text-sky-50 border border-blue-300/40" : "bg-gradient-to-r from-blue-800 to-slate-900/40 text-cyan-300 border border-cyan-700/50"}
        `}>
          <span className={`w-3 h-3 rounded-full mr-2 shadow ${isConnected ? "bg-blue-300 animate-pulse" : "bg-gray-400"}`} />
          Connection: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        {!voiceStatus.is_running ? (
          <button
            onClick={startVoiceEngine}
            className="flex items-center gap-2 bg-gradient-to-r from-green-400 via-green-600 to-sky-500 text-white font-bold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <FiMic className="text-lg" /> Start Voice Engine
          </button>
        ) : (
          <button
            onClick={stopVoiceEngine}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-red-600 text-white font-bold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <FiPower className="text-lg" /> Stop Voice Engine
          </button>
        )}
        <button
          onClick={testWakeWord}
          disabled={!voiceStatus.is_running}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl shadow-lg font-bold ${voiceStatus.is_running
            ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 text-black hover:scale-105"
            : "bg-gradient-to-r from-gray-400 to-gray-600 text-gray-100 cursor-not-allowed opacity-60"}`}
        >
          <FiBell className="text-lg" /> Test Wake Word
        </button>
        <button
          onClick={checkStatus}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-700 text-white font-bold px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          <FiRefreshCw className="text-lg" /> Refresh Status
        </button>
      </div>
      <div className="bg-slate-900/80 border-l-4 border-cyan-500/60 rounded-xl p-5 mb-6">
        <h4 className="font-bold text-cyan-300 text-lg mb-2">Voice Engine Information:</h4>
        <ul className="text-cyan-100 text-base list-disc ml-6 space-y-1">
          <li><span className="font-semibold">Wake Word:</span> "{voiceStatus.wake_word || 'hey ocean'}"</li>
          <li><span className="font-semibold">Status:</span> {voiceStatus.status}</li>
          <li><span className="font-semibold">WebSocket:</span> {isConnected ? 'Connected' : 'Disconnected'}</li>
        </ul>
      </div>
      <div className="bg-slate-900/90 border-l-4 border-cyan-500/40 rounded-xl p-5">
        <h4 className="font-bold text-cyan-300 text-lg mb-2">Integration Notes:</h4>
        <ul className="text-cyan-200 text-base list-disc ml-6 space-y-1">
          <li>This panel shows the status of the Python voice engine and ARGO listening.</li>
          <li>When the engine is running, it will listen for <span className="text-cyan-300 font-semibold">"{voiceStatus.wake_word || 'hey ocean'}"</span> and respond with voice AI.</li>
          <li>All controls above interact with the backend in real time via WebSocket or REST.</li>
        </ul>
      </div>
    </div>
  );
};
export default VoiceIntegration;
