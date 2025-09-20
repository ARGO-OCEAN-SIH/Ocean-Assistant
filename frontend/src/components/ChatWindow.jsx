import React, { useState, useRef, useEffect } from "react";

const initialMessages = [
  { id: 1, text: "Welcome to Ocean Assistant! 🌊", sender: "system" },
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

  { id: 21, text: "How do ocean currents affect climate?", sender: "user" },
  {
    id: 22,
    text: "Ocean currents distribute heat around the globe, influencing regional climates and weather patterns.",
    sender: "system",
  },
  { id: 23, text: "What is the ARGO program?", sender: "user" },
  {
    id: 24,
    text: "ARGO is a global network of autonomous floats measuring temperature and salinity across the world's oceans.",
    sender: "system",
  },
  { id: 25, text: "Show me recent pH trends in the oceans.", sender: "user" },
  {
    id: 26,
    text: "Ocean acidity (pH) has dropped by 0.1 units since the industrial revolution, impacting marine life.",
    sender: "system",
  },
  { id: 27, text: "Can you recommend actions to protect ocean health?", sender: "user" },
  {
    id: 28,
    text: "Promoting sustainable fishing, reducing plastic waste, and lowering greenhouse gases help protect oceans.",
    sender: "system",
  },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);


  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const generateReply = (userInput) => {
    const normalized = userInput.toLowerCase();

    if (normalized.includes("argo float")) {
      return "Displaying ARGO float data for requested region with the latest parameters.";
    }
    if (normalized.includes("temperature trend")) {
      return "Recent data shows ocean temperature rising approximately 0.13°C per decade.";
    }
    if (normalized.includes("climate impact") || normalized.includes("ocean currents")) {
      return "Ocean currents greatly influence weather and climate by redistributing heat globally.";
    }
    if (normalized.includes("act protect ocean") || normalized.includes("save ocean")) {
      return "Reducing pollution, protecting marine habitats, and cutting carbon emissions are vital.";
    }
    if (normalized.trim() === "") {
      return "Please type a question or command to explore ocean data.";
    }

    return "Sorry, I am still learning about that topic. Feel free to ask about ARGO floats, ocean temperature, or marine protection!";
  };


  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: messages.length + 1,
      text: trimmed,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

  
    setTimeout(() => {
      const replyText = generateReply(trimmed);
      const aiMessage = {
        id: messages.length + 2,
        text: replyText,
        sender: "system",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setTyping(false);
    }, 1200);
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-700 text-lg font-semibold text-blue-400 select-none">
        🌊 Ocean Assistant Chat
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thumb-blue-600 scrollbar-thumb-rounded scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative max-w-[70%] break-words rounded-2xl px-5 py-3 text-sm font-medium shadow-md transition ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-100 rounded-bl-none"
              }`}
              aria-live={msg.sender === "system" ? "polite" : "off"}
            >
              {msg.text}
              {/* Small tail decoration */}
              <span
                className={`absolute bottom-0 w-3 h-3 bg-transparent ${
                  msg.sender === "user"
                    ? "right-0 translate-x-1/2 rounded-bl-xl bg-blue-600"
                    : "left-0 -translate-x-1/2 rounded-br-xl bg-gray-700"
                }`}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex w-full justify-start">
            <div className="bg-gray-700 rounded-2xl px-5 py-3 text-sm font-medium text-gray-300 max-w-[30%] animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <form
        className="p-3 border-t border-gray-700 flex items-center gap-2 bg-gray-800/70"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          rows={1}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 resize-none bg-gray-900/80 text-gray-200 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 scrollbar-thumb-blue-600 scrollbar-thumb-rounded scrollbar-thin"
          maxLength={500}
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={input.trim().length === 0}
          className={`flex-none bg-blue-600 px-5 py-2 rounded-xl text-white font-semibold transition shadow-lg hover:bg-blue-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed`}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
