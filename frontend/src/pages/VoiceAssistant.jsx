import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCid1kiX5wUgPinFZ9ij76hPuKW_WuxmyA");

const VoiceAssistant = ({ onSwitchToChat }) => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = () => {
    if (!SpeechRecognition) return alert("Speech Recognition not supported in this browser.");
    if (recognitionRef.current) recognitionRef.current.stop();
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = async (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setListening(false);
      await sendToGemini(result);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
  };

  const sendToGemini = async (userInput) => {
    let timeoutId;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const timeoutPromise = new Promise((resolve) => {
        timeoutId = setTimeout(() => resolve("No response."), 10000);
      });
      const apiPromise = model.generateContent({
        contents: [{ role: "user", parts: [{ text: userInput }] }],
      });
      const result = await Promise.race([apiPromise, timeoutPromise]);
      clearTimeout(timeoutId);
      let aiReply = "No response.";
      if (typeof result === "string") {
        aiReply = result;
      } else {
        aiReply = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      }
      setResponse(aiReply);
      const speech = new window.SpeechSynthesisUtterance(aiReply);
      window.speechSynthesis.speak(speech);
    } catch (err) {
      setResponse("Error contacting AI");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-950 via-slate-900/90 to-cyan-950 px-2 flex flex-col items-center justify-between font-montserrat relative overflow-x-hidden">
      <header className="w-full max-w-2xl mx-auto flex flex-col items-center text-center py-12 z-20">
        <h1 className="text-4xl md:text-5xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400 text-transparent bg-clip-text drop-shadow-glowBlue">
          Ocean AI Voice Assistant
        </h1>
        <p className="mt-3 text-cyan-100 text-lg md:text-2xl font-medium tracking-wide max-w-2xl">
          Use your voice to explore real-time ocean insights and AI-powered marine data.
        </p>
        <button
          className="mt-6 px-7 py-3 rounded-xl flex items-center gap-2 bg-gradient-to-br from-cyan-600 via-blue-600 to-sky-600 text-white font-bold text-lg shadow-xl hover:bg-cyan-700 hover:scale-105 active:scale-95 transition-all border border-cyan-400/40"
          onClick={onSwitchToChat}
        >
          <span className="text-2xl">💬</span> Switch to Chatbot Mode
        </button>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-lg mx-auto">
        <button
          className={`rounded-full w-32 h-32 flex items-center justify-center text-4xl font-bold transition-all duration-300 border-4 
            ${listening
              ? "bg-gradient-to-br from-red-500 to-pink-700 border-red-300 animate-pulse shadow-lg shadow-red-800/40"
              : "bg-gradient-to-br from-cyan-700 to-blue-800 border-cyan-400 shadow-xl shadow-cyan-800/30 hover:scale-105"}
          `}
          onClick={listening ? stopListening : startListening}
        >
          {listening ? "🛑 Stop" : "🎤 Voice"}
        </button>
        <div className="w-full my-10 flex flex-col gap-6">
          <div className="w-full min-h-[60px] bg-cyan-950/70 border border-cyan-500/30 rounded-lg px-6 py-4 flex items-center text-cyan-300 font-medium text-lg tracking-wide shadow-inner backdrop-blur-lg">
            {transcript ? transcript : "Say something about ocean data..."}
          </div>
          <div className="w-full min-h-[60px] bg-blue-950/80 border border-lime-400/30 rounded-lg px-6 py-4 flex items-center text-lime-300 font-medium text-lg tracking-wide shadow-inner backdrop-blur-lg">
            {response ? response : "AI response will appear here..."}
          </div>
        </div>
      </main>
      <footer className="w-full flex justify-center items-center py-4 mt-auto bg-gradient-to-t from-blue-950/90 to-transparent text-cyan-400 text-sm font-semibold tracking-wide border-t border-cyan-700/30">
        © 2025 Ocean AI Dashboard | Powered by ARGO & Conversational Intelligence
      </footer>
      <span className="pointer-events-none fixed -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-600/40 to-transparent blur-3xl opacity-60 z-0" />
    </div>
  );
};

export default VoiceAssistant;
