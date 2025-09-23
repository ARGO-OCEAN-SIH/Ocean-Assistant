import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ReactMic } from "react-mic";

const genAI = new GoogleGenerativeAI("AIzaSyCid1kiX5wUgPinFZ9ij76hPuKW_WuxmyA");

// Floating texts for left and right sides
const floatingTextsLeft = [
  { id: 1, text: "Data", style: { top: "10%", left: "10%", color: "#18b8ff" } },
  { id: 3, text: "AI", style: { top: "30%", left: "5%", color: "#1df3ff" } },
  { id: 6, text: "Marine", style: { top: "50%", left: "12%", color: "#1df3ff" } },
  { id: 9, text: "Protection", style: { top: "70%", left: "10%", color: "#1df3ff" } },
];
const floatingTextsRight = [
  { id: 2, text: "Oceans", style: { top: "15%", right: "12%", color: "#63e2ff" } },
  { id: 4, text: "Insights", style: { top: "40%", right: "15%", color: "#18b8ff" } },
  { id: 5, text: "Explore", style: { top: "60%", right: "10%", color: "#63e2ff" } },
  { id: 7, text: "Ecosystems", style: { top: "80%", right: "12%", color: "#18b8ff" } },
  { id: 8, text: "Sustainability", style: { top: "90%", right: "15%", color: "#63e2ff" } },
];

// Zigzag transform function for dynamic floating effect
const zigzagTransform = (offset, id) => {
  const xMove = Math.sin((offset + id * 50) / 15) * 20;
  const yMove = Math.cos((offset + id * 30) / 10) * 12;
  const rotate = (offset + id * 40) / 15;
  return `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg)`;
};

const VoiceAssistant = () => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const [offset, setOffset] = useState(0);

  // Continuous update for animated floating texts
  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setOffset((old) => {
        if (old > 20) direction = -1;
        else if (old < -20) direction = 1;
        return old + direction;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

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
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col text-white selection:bg-cyan-400 selection:text-gray-900 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2014/02/26/21/25/jellyfish-275577_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      {/* Floating texts - Left */}
      {floatingTextsLeft.map(({ id, text, style }) => (
        <span
          key={id}
          className="absolute font-extrabold text-glow text-2xl select-none pointer-events-none"
          style={{
            ...style,
            transform: `translateY(${Math.sin((offset + id * 20) / 10) * 8}px) rotate(${(offset + id * 40) / 10}deg)`,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      ))}
      {/* Floating texts - Right */}
      {floatingTextsRight.map(({ id, text, style }) => (
        <span
          key={id}
          className="absolute font-extrabold text-glow text-2xl select-none pointer-events-none"
          style={{
            ...style,
            transform: `translateY(${Math.sin((offset + id * 20) / 12) * 8}px) rotate(${(offset + id * 40) / 12}deg)`,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      ))}
      {/* Main Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12 sm:py-20 relative max-w-xl mx-auto w-full gap-10 z-10">
        {/* Background glowing animated circles */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-20 w-56 h-56 bg-cyan-400 rounded-full opacity-20 blur-3xl animate-pulse-slow mix-blend-screen z-0"
          style={{ animationDuration: "8s" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -right-10 w-72 h-72 bg-indigo-600 rounded-full opacity-30 blur-3xl animate-pulse-slow mix-blend-screen z-0"
          style={{ animationDuration: "10s" }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-[25%] w-32 h-32 bg-blue-700 rounded-full opacity-25 blur-2xl animate-pulse-slow mix-blend-screen z-0"
          style={{ animationDuration: "12s" }}
        />
        {/* Voice control panel */}
        <section className="relative bg-gray-900/70 border border-cyan-500 rounded-3xl shadow-2xl p-10 w-full backdrop-blur-md space-y-8 max-w-xl z-10">
          <div className="flex justify-center">
            <button
              onClick={listening ? stopListening : startListening}
              disabled={listening && !SpeechRecognition}
              className={`px-10 py-4 text-xl rounded-full font-bold shadow-lg transform transition-transform 
                focus:outline-none focus:ring-4 focus:ring-cyan-400 active:scale-95 select-none
                ${listening ? "bg-red-600 hover:bg-red-500" : "bg-cyan-600 hover:bg-cyan-500"}`}
              aria-label={listening ? "Stop Listening" : "Start Voice"}
            >
              {listening ? "🛑 Stop Listening" : "🎤 Start Voice"}
            </button>
          </div>
          <div className="w-full h-40 bg-black/30 rounded-xl border border-cyan-600 overflow-hidden flex items-center justify-center relative">
            <ReactMic
              record={listening}
              className="w-full h-full"
              strokeColor="#22d3ee"
              backgroundColor="transparent"
              amplitudeScale={1.8}
              visualSetting="sinewave"
            />
          </div>
          <div className="p-6 rounded-xl bg-indigo-900/80 border border-indigo-600 text-cyan-300 min-h-[100px] text-center font-mono text-lg select-text whitespace-pre-wrap max-h-28 overflow-auto shadow-inner">
            {transcript || "Say something and let me assist you with ocean data..."}
          </div>
          <div className="p-6 rounded-xl bg-black/80 border border-green-600 text-green-400 min-h-[100px] text-center font-mono text-lg select-text whitespace-pre-wrap max-h-28 overflow-auto shadow-inner">
            {response || "AI response will appear here..."}
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="py-4 text-center text-gray-400 text-sm border-t border-gray-700 mt-10 select-none z-10">
        © 2025 Ocean Assistant | Powered by ARGO & AI
      </footer>
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 12s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse 6s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        .text-glow {
          text-shadow:
            0 0 8px rgba(24, 184, 255, 0.8),
            0 0 14px rgba(29, 243, 255, 0.6),
            0 0 18px rgba(54, 199, 255, 0.5);
          color: #18b8ffdd;
        }
        button:focus-visible {
          outline-offset: 4px;
        }
      `}</style>
    </div>
  );
};

export default VoiceAssistant;
