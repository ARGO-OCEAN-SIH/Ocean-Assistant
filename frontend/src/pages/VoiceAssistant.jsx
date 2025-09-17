import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ReactMic } from "react-mic";

// ✅ Initialize Gemini SDK
const genAI = new GoogleGenerativeAI("AIzaSyCid1kiX5wUgPinFZ9ij76hPuKW_WuxmyA");

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // 🎤 Start Listening
  const startListening = () => {
    if (!SpeechRecognition)
      return alert("Speech Recognition not supported in this browser.");
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

  // 🚀 Send transcript to Gemini API
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
        aiReply =
          result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response.";
      }
      setResponse(aiReply);

      const speech = new SpeechSynthesisUtterance(aiReply);
      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error(err);
      setResponse("Error contacting AI");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white">
      <Navbar />

      {/* Main Section */}
      <main className="flex-1 flex justify-center items-center px-4">
        <section className="bg-gray-800/60 border border-gray-700 rounded-xl shadow-2xl p-8 max-w-xl w-full space-y-6 backdrop-blur">
          {/* 🎤 Mic Button */}
          <div className="flex justify-center">
            <button
              onClick={listening ? stopListening : startListening}
              className={`px-6 py-3 text-lg rounded-full font-semibold shadow-lg transition ${
                listening
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-cyan-600 hover:bg-cyan-500"
              }`}
            >
              {listening ? "🛑 Stop Listening" : "🎤 Start Voice"}
            </button>
          </div>

          {/* 🌊 Dynamic Waveform */}
          <div className="flex justify-center">
            <div className="w-full h-32 bg-black/40 rounded-lg border border-cyan-600 overflow-hidden">
              <ReactMic
                record={listening}
                className="w-full h-full"
                strokeColor="#00f5ff"
                backgroundColor="transparent"
              />
            </div>
          </div>

          {/* 📝 User Transcript */}
          <div className="p-4 rounded-lg bg-indigo-900/50 border border-indigo-600 text-cyan-300 min-h-[60px]">
            {transcript || "Say something..."}
          </div>

          {/* 🤖 AI Response */}
          <div className="p-4 rounded-lg bg-black/50 border border-green-600 text-green-400 min-h-[60px]">
            {response || "AI response will appear here..."}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-700 mt-8">
        © 2025 Ocean Assistant | Powered by ARGO & AI
      </footer>
    </div>
  );
};

export default VoiceAssistant;
