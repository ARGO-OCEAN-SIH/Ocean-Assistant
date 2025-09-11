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
  <div className="message-list">
    {messages.map(msg => (
      <div
        key={msg.id}
        className={`message-bubble ${msg.sender === 'user' ? 'user-msg' : 'system-msg'}`}
      >
        {msg.text}
      </div>
    ))}
  </div>
);

export default MessageList;
