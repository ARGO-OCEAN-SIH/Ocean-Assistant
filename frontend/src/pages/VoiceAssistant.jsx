import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Initialize Gemini SDK
const genAI = new GoogleGenerativeAI("AIzaSyCid1kiX5wUgPinFZ9ij76hPuKW_WuxmyA");

const VoiceAssistant = ({ onSwitchToChat }) => {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // 🎤 Start Listening to User
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

      // 🤖 Call Gemini API with transcript
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

      // Set up a timeout for 10 seconds
      const timeoutPromise = new Promise((resolve) => {
        timeoutId = setTimeout(() => resolve("No response."), 10000);
      });

      // Race Gemini API call against timeout
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

      // 🔊 Optional: Convert AI response to speech
      const speech = new SpeechSynthesisUtterance(aiReply);
      window.speechSynthesis.speak(speech);
    } catch (err) {
      console.error(err);
      setResponse("Error contacting AI");
    }
  };

  return (
    <div className="home-page sci-fi-bg">
      <header className="sci-fi-header">
        <h1 className="sci-fi-title">🌌 Ocean Assistant</h1>
        <p className="sci-fi-subtitle">Voice Assistant Mode</p>
        <button className="voice-mode-btn" onClick={onSwitchToChat}>
          💬 Switch to Chatbot Mode
        </button>
      </header>

      <main
        className="sci-fi-main-grid"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <section
          className="sci-fi-chat-section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 🎤 Mic Button */}
          <div style={{ marginBottom: 24 }}>
            <button
              className={listening ? "mic-btn listening" : "mic-btn"}
              onClick={listening ? stopListening : startListening}
              style={{ fontSize: "2rem", padding: "16px" }}
            >
              {listening ? "🛑 Stop Listening" : "🎤 Start Voice"}
            </button>
          </div>

          {/* 📝 User Transcript */}
          <div
            className="voice-transcript"
            style={{
              fontSize: "1.3rem",
              color: "#00eaff",
              background: "#181b3a",
              borderRadius: 12,
              padding: 16,
              minWidth: 300,
              minHeight: 60,
              marginBottom: 20,
            }}
          >
            {transcript ? transcript : "Say something..."}
          </div>

          {/* 🤖 AI Response */}
          <div
            className="ai-response"
            style={{
              fontSize: "1.2rem",
              color: "#7CFC00",
              background: "#101322",
              borderRadius: 12,
              padding: 16,
              minWidth: 300,
              minHeight: 60,
            }}
          >
            {response ? response : "AI response will appear here..."}
          </div>
        </section>
      </main>

      <footer className="sci-fi-footer">
        <span>© 2025 Ocean Assistant | Powered by ARGO & AI</span>
      </footer>
    </div>
  );
};

export default VoiceAssistant;
