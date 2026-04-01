
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AnalyticsDashboard from './pages/NewHome';
import About from './pages/About';
import VoiceAssistant from './pages/VoiceAssistant';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/analyticsDashboard" element={<AnalyticsDashboard />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voice" element={<VoiceAssistant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
