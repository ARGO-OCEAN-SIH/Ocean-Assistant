
import './App.css';
import Home from './pages/Home';
import VoiceAssistant from './pages/VoiceAssistant';
import AboutPage from './pages/Aboutpage';
import React, { useState } from 'react';
import { Routes, Route} from "react-router-dom";
import Navbar from './pages/navbar';

function App() {
  const [voiceMode, setVoiceMode] = useState(false);

  return (
    <div className="App">
      {voiceMode ? (
        <VoiceAssistant onSwitchToChat={() => setVoiceMode(false)} />
      ) : (
        <>
          <Navbar/>
         <Routes>
          <Route path="/" element={<Home onSwitchToVoice={() => setVoiceMode(true)} />} />
          <Route path="/AboutPage" element={<AboutPage />} />
        </Routes>
        </>
      )}
    </div>
  );
}

export default App;
