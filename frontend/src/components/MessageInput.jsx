import React from 'react';
import { IoSend } from 'react-icons/io5';

const MessageInput = () => (
  <div className="flex w-full items-center gap-3 bg-gradient-to-r from-blue-950/90 via-cyan-900/70 to-blue-900/70 p-3 rounded-lg shadow-md border border-cyan-600/30 backdrop-blur">
    <input
      type="text"
      className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-cyan-100 placeholder-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all shadow-inner border border-cyan-700/30"
      placeholder="Send a message about ocean datasets, e.g. – Compare ARGO profiles..."
    />
    <button
      className="inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow-md bg-gradient-to-br from-cyan-600 via-sky-500 to-blue-700 text-white hover:from-cyan-700 hover:to-blue-800 hover:scale-105 active:scale-95 transition-all"
      type="submit"
      aria-label="Send your message"
    >
      <IoSend className="text-xl" />
      Send
    </button>
  </div>
);

export default MessageInput;
