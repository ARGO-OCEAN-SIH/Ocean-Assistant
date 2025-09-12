import './App.css';
import Home from './pages/Home';
import VoiceAssistant from './pages/VoiceAssistant';
import React, { useState } from 'react';

function App() {
  const [voiceMode, setVoiceMode] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-950 via-slate-950/85 to-cyan-950 flex flex-col justify-center items-center font-montserrat px-1 md:px-0 relative">
      <div className="w-full max-w-[1700px] min-h-screen flex flex-col shadow-2xl border border-cyan-600/30 rounded-none md:rounded-[36px] overflow-hidden bg-slate-950/90 backdrop-blur-lg mx-auto">
        {voiceMode ? (
          <VoiceAssistant onSwitchToChat={() => setVoiceMode(false)} />
        ) : (
          <Home onSwitchToVoice={() => setVoiceMode(true)} />
        )}
      </div>
      <span className="pointer-events-none fixed -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-600/30 to-transparent blur-3xl opacity-50 z-0" />
    </div>
  );
}

export default App;
