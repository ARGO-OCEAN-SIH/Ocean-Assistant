// ChatWindow.jsx

import React, { useState, useRef, useEffect } from "react";
import {
  sendMessage,
  initWebSocket,
  sendWebSocketMessage,
  getExampleQueries,
  checkBackendHealth,
} from "../services/chatService";

// You can import OceanDataCard if it's in a separate file
// import OceanDataCard from "./OceanDataCard"; 

// Paste the OceanDataCard component code here if not using a separate file
const OceanDataCard = ({ text }) => {
  const parseData = (dataText) => {
    const data = {};
    const lines = dataText.split('\n');
    lines.forEach(line => {
      if (line.includes('**Location**')) {
        data.location = line.split('**Location**: ')[1].trim();
      } else if (line.includes('**Temperature**')) {
        data.temperature = line.split('**Temperature**: ')[1].trim();
      } else if (line.includes('**Salinity**')) {
        data.salinity = line.split('**Salinity**: ')[1].trim();
      }
    });
    const measurementsMatch = dataText.match(/Found \*\*(\d+)/);
    data.measurements = measurementsMatch ? measurementsMatch[1] : 'N/A';
    data.source = lines[lines.length - 1].split('*Based on ')[1].replace('*', '');
    return data;
  };
  const parsedData = parseData(text);
  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-md text-gray-100 max-w-[70%]">
      <div className="flex items-center text-blue-400 font-bold text-lg mb-2">
        <span role="img" aria-label="ocean-icon" className="mr-2 text-2xl">🌊</span>
        Ocean Data Analysis
      </div>
      <p className="text-gray-300 text-sm mb-3">
        Found <span className="font-extrabold text-white">{parsedData.measurements}</span> measurements matching your query.
      </p>
      <div className="space-y-1 text-sm">
        <div className="flex items-center">
          <span className="font-bold">Location</span>: {parsedData.location} <span role="img" aria-label="location-pin" className="ml-1">📍</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Temperature</span>: {parseFloat(parsedData.temperature).toFixed(2)} °C <span role="img" aria-label="thermometer" className="ml-1">🌡️</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Salinity</span>: {parseFloat(parsedData.salinity).toFixed(2)} PSU <span role="img" aria-label="salt" className="ml-1">🧂</span>
        </div>
      </div>
      <hr className="border-gray-700 my-3" />
      <p className="text-xs italic text-gray-400">
        *Based on {parsedData.source}*
      </p>
    </div>
  );
};


const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Ocean Assistant!", sender: "system" },
    { id: 2, text: "How can I help you explore the ocean today?", sender: "system" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const cleanup = initWebSocket((data) => {
      if (data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: data.response, sender: "system" },
        ]);
      }
    });

    const checkHealth = async () => {
      try {
        await checkBackendHealth();
        setIsConnected(true);
      } catch (err) {
        setError("Unable to connect to backend");
        setIsConnected(false);
      }
    };

    checkHealth();

    return () => {
      cleanup();
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      sendWebSocketMessage(input);
      const response = await sendMessage(input);
      
      if (response) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text: response.response || "No response from server", sender: "system" },
        ]);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadExampleQueries = async () => {
      try {
        const examples = await getExampleQueries();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "Here are some example queries you can try:\n" +
                  examples.map(ex => `• ${ex.query}`).join("\n"),
            sender: "system"
          }
        ]);
      } catch (err) {
        console.error("Failed to load example queries:", err);
      }
    };
    loadExampleQueries();
  }, []);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700">
      <div className="px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-lg font-bold text-blue-400">AI Assistant</span>
        <span className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-whatsapp">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "system" && msg.text.includes('**Ocean Data Analysis**') ? (
              <OceanDataCard text={msg.text} />
            ) : (
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-md transition 
                          max-w-[70%] break-words ${
                            msg.sender === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-700 text-gray-100 rounded-bl-none"
                          }`}
              >
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl text-sm shadow-md bg-gray-700 text-gray-100 rounded-bl-none">
              Thinking...
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="px-4 py-2 rounded-2xl text-sm shadow-md bg-red-600/20 text-red-400">
              {error}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-3 border-t border-gray-700 flex items-center gap-2 bg-gray-800/60">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSend()}
          className="flex-1 bg-gray-900/70 text-gray-200 px-4 py-2 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`px-4 py-2 rounded-xl text-white font-bold transition shadow-lg
                     ${isLoading 
                       ? 'bg-gray-600 cursor-not-allowed'
                       : 'bg-blue-600 hover:bg-blue-700'
                     }`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;