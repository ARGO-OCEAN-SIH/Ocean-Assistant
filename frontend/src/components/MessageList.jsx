import React, { useEffect, useRef, useState } from "react";

const initialMessages = [
  { id: 1, text: "Welcome to Ocean Assistant! 🌊", sender: "system" },
  { id: 2, text: "How can I help you explore the ocean today?", sender: "system" },
  { id: 3, text: "Show me ARGO float data for the Pacific.", sender: "user" },
  { id: 4, text: "Fetching latest ARGO data for Pacific region...", sender: "system" },
  { id: 5, text: "Here is the interactive map and chart.", sender: "system" },
  { id: 6, text: "Thank you!", sender: "user" },
  { id: 7, text: "You’re welcome! 🌊", sender: "system" },
  { id: 8, text: "Can you analyze recent trends in ocean temperature?", sender: "user" },
  { id: 9, text: "Analyzing temperature trends...", sender: "system" },
  { id: 10, text: "The average ocean temperature has risen by approximately 0.13°C per decade.", sender: "system" },
  { id: 11, text: "That’s concerning. What actions can be taken?", sender: "user" },
  { id: 12, text: "Reducing carbon emissions and protecting marine ecosystems are key steps.", sender: "system" },
  { id: 13, text: "Got it. Thanks for the info!", sender: "user" },
  { id: 14, text: "Always here to help. Feel free to ask more!", sender: "system" },
  { id: 15, text: "Show recent data on ocean acidification.", sender: "user" },
  { id: 16, text: "Ocean acidity has increased by 26% since pre-industrial times, affecting marine life.", sender: "system" },
  { id: 17, text: "What are ARGO floats and why are they important?", sender: "user" },
  { id: 18, text: "ARGO floats collect vital temperature, salinity, and other data from oceans to track climate and ocean health.", sender: "system" },
  { id: 19, text: "Can you display data from the Atlantic?", sender: "user" },
  { id: 20, text: "Fetching latest ARGO data for Atlantic region...", sender: "system" },
  { id: 21, text: "How often do ARGO floats collect data?", sender: "user" },
  { id: 22, text: "They typically surface every 10 days to transmit dive data.", sender: "system" },
  { id: 23, text: "What effects do ocean currents have on global climate?", sender: "user" },
  { id: 24, text: "Ocean currents distribute heat globally, regulating weather and climate.", sender: "system" },
  { id: 25, text: "How can I download historical ocean data?", sender: "user" },
  { id: 26, text: "You can export data from our dashboards as CSV or JSON files.", sender: "system" },
  { id: 27, text: "What can I do to help protect oceans?", sender: "user" },
  { id: 28, text: "Reducing plastic use, supporting sustainable fisheries, and lowering emissions help marine health.", sender: "system" },
  { id: 29, text: "Do you support real-time data updates?", sender: "user" },
  { id: 30, text: "Our system updates data every hour to ensure you have the latest insights.", sender: "system" },
  { id: 31, text: "What other sensor data do you integrate besides temperature and salinity?", sender: "user" },
  { id: 32, text: "We also integrate oxygen levels, chlorophyll, and biogeochemical parameters.", sender: "system" },
  { id: 33, text: "Show me recent anomalies in salinity.", sender: "user" },
  { id: 34, text: "Recent data indicates localized drops in salinity near coastal runoff regions.", sender: "system" },
  { id: 35, text: "Can I customize visualizations?", sender: "user" },
  { id: 36, text: "Yes, our platform allows you to customize graphs, maps, and export results.", sender: "system" },
  { id: 37, text: "Does this platform support collaboration?", sender: "user" },
  { id: 38, text: "We offer shared dashboards and data export for team collaboration.", sender: "system" },
  { id: 39, text: "How accurate is the ARGO data?", sender: "user" },
  { id: 40, text: "ARGO data is validated globally and considered highly reliable for oceanographic research.", sender: "system" },
];

const MessageList = () => {
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list max-h-[70vh] overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-lg border border-blue-500">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message-bubble flex max-w-[75%] p-3 rounded-2xl shadow-lg relative 
            ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white self-end animate-message-fade-in"
                : "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 self-start animate-message-slide-in"
            }`}
          aria-live={msg.sender === "system" ? "polite" : "off"}
          tabIndex={-1}
          role="article"
        >
          <span className="whitespace-pre-wrap">{msg.text}</span>
          <span
            className={`absolute bottom-0 w-4 h-4 rounded-full ${
              msg.sender === "user"
                ? "right-0 translate-x-1/2 bg-cyan-300 shadow-cyan-400"
                : "left-0 -translate-x-1/2 bg-gray-500 shadow-gray-600"
            }`}
            style={{ filter: "blur(3px)" }}
            aria-hidden="true"
          />
        </div>
      ))}
      <div ref={messagesEndRef} />
      <style jsx>{`
        .message-list {
          scrollbar-width: thin;
          scrollbar-color: #22caff #02233c;
        }
        .message-list::-webkit-scrollbar {
          width: 8px;
        }
        .message-list::-webkit-scrollbar-track {
          background: #02233c;
          border-radius: 4px;
        }
        .message-list::-webkit-scrollbar-thumb {
          background-color: #22caff;
          border-radius: 4px;
          border: 2px solid #02233c;
        }
        .animate-message-fade-in {
          animation: fadeInUp 0.5s ease forwards;
        }
        .animate-message-slide-in {
          animation: slideInLeft 0.5s ease forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MessageList;
