import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        console.log('Connected to voice WebSocket');
        setIsConnected(true);
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setVoiceStatus(data);
      };
      
      ws.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnected(false);
        // Attempt to reconnect after 2 seconds
        setTimeout(connectWebSocket, 2000);
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      return ws;
    };

    const ws = connectWebSocket();
    
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="voice-integration">
      <h3>🎤 Voice Engine Integration</h3>
      
      <div className="status-indicators">
        <div className={`status-item ${voiceStatus.is_running ? 'active' : 'inactive'}`}>
          <span className="status-dot"></span>
          Engine: {voiceStatus.is_running ? 'RUNNING' : 'STOPPED'}
        </div>
        
        <div className={`status-item ${voiceStatus.is_awake ? 'active' : 'inactive'}`}>
          <span className="status-dot"></span>
          State: {voiceStatus.is_awake ? 'AWAKE' : 'SLEEPING'}
        </div>
        
        <div className={`status-item ${isConnected ? 'active' : 'inactive'}`}>
          <span className="status-dot"></span>
          Connection: {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
      </div>

      <div className="controls">
        {!voiceStatus.is_running ? (
          <button onClick={startVoiceEngine} className="start-btn">
            🎤 Start Voice Engine
          </button>
        ) : (
          <button onClick={stopVoiceEngine} className="stop-btn">
            ⏹️ Stop Voice Engine
          </button>
        )}
        
        <button onClick={testWakeWord} className="test-btn" disabled={!voiceStatus.is_running}>
          🔔 Test Wake Word
        </button>
        
        <button onClick={checkStatus} className="refresh-btn">
            </button>
      </div>

      <div className="voice-info">
        <h4>Voice Engine Information:</h4>
        <ul>
          <li><strong>Wake Word:</strong> "{voiceStatus.wake_word || 'hey ocean'}"</li>
          <li><strong>Status:</strong> {voiceStatus.status}</li>
          <li><strong>WebSocket:</strong> {isConnected ? 'Connected' : 'Disconnected'}</li>
        </ul>
      </div>

      <div className="integration-instructions">
        <h4>Integration Notes:</h4>
        <p>This component shows the status of the Python voice engine.</p>
        <p>When the engine is running, it will listen for "hey ocean" and respond with voice.</p>
        <p>Use the buttons above to control the voice engine from React.</p>
      </div>

      <style jsx>{`
        .voice-integration {
          padding: 20px;
          border: 2px solid #0077b6;
          border-radius: 10px;
          margin: 20px;
          background: #f8f9fa;
        }
        
        .status-indicators {
          display: flex;
          gap: 15px;
          margin: 15px 0;
          flex-wrap: wrap;
        }
        
        .status-item {
          display: flex;
          align-items: center;
          padding: 8px 15px;
          border-radius: 20px;
          background: #e9ecef;
          font-weight: 500;
        }
        
        .status-item.active {
          background: #d4edda;
          color: #155724;
        }
        
        .status-item.inactive {
          background: #f8d7da;
          color: #721c24;
        }
        
        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 8px;
          background: currentColor;
        }
        
        .controls {
          display: flex;
          gap: 10px;
          margin: 20px 0;
          flex-wrap: wrap;
        }
        
        .start-btn, .stop-btn, .test-btn, .refresh-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .start-btn {
          background: #28a745;
          color: white;
        }
        
        .stop-btn {
          background: #dc3545;
          color: white;
        }
        
        .test-btn {
          background: #ffc107;
          color: #212529;
        }
        
        .test-btn:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
        
        .refresh-btn {
          background: #17a2b8;
          color: white;
        }
        
        .voice-info, .integration-instructions {
          background: white;
          padding: 15px;
          border-radius: 5px;
          margin: 10px 0;
          border-left: 4px solid #0077b6;
        }
        
        .voice-info ul {
          margin: 0;
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default VoiceIntegration;