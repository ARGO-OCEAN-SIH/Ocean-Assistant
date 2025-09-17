import React, { useState, useRef, useEffect } from "react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Ocean Assistant!", sender: "system" },
    { id: 2, text: "How can I help you explore the ocean today?", sender: "system" },
    { id: 3, text: "Show me ARGO float data for the Pacific.", sender: "user" },
    { id: 4, text: "Fetching latest ARGO data for Pacific region...", sender: "system" },
    { id: 5, text: "Here is the interactive map and chart.", sender: "system" },
    { id: 6, text: "Thank you!", sender: "user" },
    { id: 7, text: "You are welcome! 🌊", sender: "system" },
    { id: 8, text: "Can you analyze recent trends in ocean temperature?", sender: "user" },
    { id: 9, text: "Analyzing temperature trends...", sender: "system" },
    { id: 10, text: "The average ocean temperature has risen by 0.13°C per decade.", sender: "system" },
    { id: 11, text: "That is concerning. What can be done?", sender: "user" },
    { id: 12, text: "Reducing carbon emissions and protecting marine ecosystems are key steps.", sender: "system" },
    { id: 13, text: "Got it. Thanks for the info!", sender: "user" },
    { id: 14, text: "Anytime! Let me know if you need more data.", sender: "system" },
    { id: 15, text: "Will do. Bye for now!", sender: "user" },
    { id: 16, text: "Goodbye! 🌊", sender: "system" },
    { id: 17, text: "Can you show me ARGO float data for the Atlantic?", sender: "user" },
    { id: 18, text: "Fetching latest ARGO data for Atlantic region...", sender: "system" },
    { id: 19, text: "Here is the interactive map and chart.", sender: "system" },
    { id: 20, text: "Goodbye! 🌊", sender: "system" },
  ]);

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-700 text-lg font-semibold text-blue-400">
        AI Assistant
      </div>

      {/* Messages */}
      <div
  className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-whatsapp"
>


        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
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
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 flex items-center gap-2 bg-gray-800/60">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-900/70 text-gray-200 px-4 py-2 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl 
                     text-white font-medium transition shadow-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
