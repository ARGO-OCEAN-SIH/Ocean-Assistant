import React from 'react';

const messages = [
  { id: 1, text: 'Welcome to Ocean Assistant!', sender: 'system' },
  { id: 2, text: 'How can I help you explore the ocean today?', sender: 'system' },
  { id: 3, text: 'Show me ARGO float data for the Pacific.', sender: 'user' },
  { id: 4, text: 'Fetching latest ARGO data for Pacific region...', sender: 'system' },
  { id: 5, text: 'Here is the interactive map and chart.', sender: 'system' },
  { id: 6, text: 'Thank you!', sender: 'user' },
  { id: 7, text: 'You are welcome! 🌊', sender: 'system' },
  { id: 8, text: 'Can you analyze recent trends in ocean temperature?', sender: 'user' },
  { id: 9, text: 'Analyzing temperature trends...', sender: 'system' },
  { id: 10, text: 'The average ocean temperature has risen by 0.13°C per decade.', sender: 'system' },
  { id: 11, text: 'That is concerning. What can be done?', sender: 'user' },
  { id: 12, text: 'Reducing carbon emissions and protecting marine ecosystems are key steps.', sender: 'system' },
  { id: 13, text: 'Got it. Thanks for the info!', sender: 'user' },
  { id: 14, text: 'Anytime! Let me know if you need more data.', sender: 'system' },
  { id: 15, text: 'Will do. Bye for now!', sender: 'user' },
  { id: 16, text: 'Goodbye! 🌊', sender: 'system' },
];

const MessageList = () => (
  <div className="flex flex-col gap-3 w-full px-1 overflow-y-auto">
    {messages.map(msg => (
      <div
        key={msg.id}
        className={`
          flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}
        `}
      >
        <div
          className={`
            max-w-[80%] break-words rounded-2xl px-5 py-3 
            text-base md:text-lg shadow-lg transition-all
            ${msg.sender === 'user'
              ? 'bg-gradient-to-br from-cyan-700 via-blue-700 to-sky-600 border-2 border-cyan-400 text-cyan-50 neon-shadow-user'
              : 'bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900/80 border-2 border-cyan-700/70 text-cyan-200 neon-shadow-system'}
          `}
        >
          {msg.text}
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;
