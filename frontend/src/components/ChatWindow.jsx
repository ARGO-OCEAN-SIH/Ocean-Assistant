import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { FiMessageSquare } from 'react-icons/fi';

const ChatWindow = () => (
  <div className="w-full max-w-md mx-auto rounded-xl bg-gradient-to-br from-blue-950 via-slate-900/70 to-cyan-900/40 shadow-2xl border border-cyan-800/50 my-4 glass shadow-cyan-900/40 backdrop-blur-xl relative flex flex-col h-[520px]">
    <div className="flex items-center gap-2 px-6 py-4 border-b border-cyan-700/30 bg-gradient-to-r from-cyan-700/40 via-blue-900/20 to-indigo-800/30 rounded-t-xl">
      <FiMessageSquare className="text-cyan-300 text-lg animate-pulse" />
      <h3 className="font-bold text-cyan-200 tracking-wide text-lg md:text-xl select-none">
        Ocean AI Chat Interface
      </h3>
    </div>
    <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
      <MessageList />
    </div>
    <div className="p-4 bg-gradient-to-r from-blue-900/40 to-cyan-900/30 rounded-b-xl border-t border-cyan-700/30">
      <MessageInput />
    </div>
  </div>
);

export default ChatWindow;
