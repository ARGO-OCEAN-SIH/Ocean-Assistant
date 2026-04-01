import React, { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ReactMic } from "react-mic";
import VoiceManager from "./VoiceManager";

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
    <div>
      <Navbar/>
    <VoiceManager/>
    </div>
   );
};

export default VoiceAssistant;
