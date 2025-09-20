import React, { useState, useRef, useEffect } from 'react';

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

   useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-700 to-cyan-500 p-4 shadow-lg flex items-center gap-3 z-50">
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Shift+Enter for new line)"
        className="flex-1 resize-none rounded-xl border border-transparent bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white/90 px-5 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-white/70 shadow-lg"
        maxLength={400}
        rows={1}
        aria-label="Chat message input"
      />
      <button
        onClick={handleSend}
        disabled={!input.trim()}
        className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl shadow-xl transition-transform active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110"
        aria-label="Send chat message"
      >
        Send
      </button>

      <style jsx>{`
        .message-input {
          backdrop-filter: saturate(180%) blur(20px);
        }
        @media (max-width: 640px) {
          .message-input {
            padding: 12px 16px;
          }
          textarea {
            font-size: 14px;
          }
          button {
            padding: 10px 16px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageInput;
