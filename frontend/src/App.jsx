
import './App.css';
import Home from './pages/Home';
import VoiceAssistant from './pages/VoiceAssistant';
import React, { useState } from 'react';

function App() {
  const [voiceMode, setVoiceMode] = useState(false);

  return (
    <div className="App">
      {voiceMode ? (
        <VoiceAssistant onSwitchToChat={() => setVoiceMode(false)} />
      ) : (
        <Home onSwitchToVoice={() => setVoiceMode(true)} />
      )}
    </div>
  );
}

export default App;
