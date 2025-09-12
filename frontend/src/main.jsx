import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-950 via-slate-950/80 to-cyan-950 flex items-center justify-center relative font-montserrat">
      <div className="absolute inset-0 pointer-events-none z-0">
        <span className="fixed -bottom-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] bg-gradient-radial from-cyan-600/40 to-transparent blur-3xl opacity-60" />
        <span className="fixed top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-900/40 to-transparent blur-2xl opacity-40" />
      </div>
      <div className="z-10 w-full min-h-screen flex flex-col items-center justify-center">
        <App />
      </div>
    </div>
  </StrictMode>,
)
