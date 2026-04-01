import React from 'react';
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// const Intro = () => {
//     return (
//          <div className="relative isolate px-6 pt-14 lg:px-8">
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
//           />
//         </div>
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//           <div className="hidden sm:mb-8 sm:flex sm:justify-center">
//             <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
//               Smart Ocean Data Analysis{' '}
//               <a href="#" className="font-semibold text-indigo-400">
//                 <span aria-hidden="true" className="absolute inset-0" />
//                 Learn more <span aria-hidden="true">&rarr;</span>
//               </a>
//             </div>
//           </div>
//           <div className="text-center">
//             <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
//               FloatChat - AI-Powered Ocean Data Discovery
//             </h1>
//             <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
//               An intelligent conversational interface for exploring ARGO ocean data. Query, visualize, and analyze oceanographic information using natural language - making complex ocean data accessible to everyone.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <a
//                 href="#"
//                 className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 Get started
//               </a>
//               <a href="#" className="text-sm/6 font-semibold text-white">
//                 Learn more <span aria-hidden="true">→</span>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
//           />
//         </div>
//       </div>
//     );
// };

// export default Intro;

import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "4,000+", label: "Active Floats" },
  { value: "2M+", label: "Daily Profiles" },
  { value: "3,800m", label: "Max Depth" },
  { value: "30+", label: "Years of Data" },
];

const Intro = () => {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animated particle canvas — simulates sonar/ocean pings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const rings = [];
    const addRing = () => {
      rings.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0,
        maxR: 80 + Math.random() * 60,
        opacity: 0.4,
        speed: 0.4 + Math.random() * 0.3,
      });
    };
    addRing();
    const ringInterval = setInterval(addRing, 2200);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // particles
      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.fill();
      });

      // sonar rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += ring.speed;
        ring.opacity = 0.4 * (1 - ring.r / ring.maxR);
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${ring.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (ring.r >= ring.maxR) rings.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(ringInterval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #020c18 0%, #041e3a 50%, #061d36 100%)" }}
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Depth lines — subtle horizontal bands */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.04 }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full border-t"
            style={{ top: `${(i + 1) * 8.33}%`, borderColor: "#38bdf8" }}
          />
        ))}
      </div>

      {/* Glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,116,144,0.18) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Top nav bar hint */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <div className="flex items-center gap-2">
          {/* <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="#38bdf8" strokeWidth="1.5" />
            <path d="M14 7 C10 14, 14 18, 14 21" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="14" cy="14" r="2.5" fill="#38bdf8" />
          </svg>
          <span style={{ fontFamily: "'Space Mono', monospace", color: "#e0f2fe", fontSize: 15, letterSpacing: "0.05em" }}>
             FLOATCHAT 
          </span> */}
        </div>
        <div className="hidden sm:flex items-center gap-6">
          {[].map((item) => (
            <a
              key={item}
              href="#"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#7dd3fc", letterSpacing: "0.08em" }}
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-10"
          style={{ borderColor: "rgba(56,189,248,0.3)", background: "rgba(56,189,248,0.06)" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#7dd3fc", letterSpacing: "0.12em" }}>
            ARGO FLOAT NETWORK · LIVE DATA
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
            lineHeight: 1.08,
            color: "#f0f9ff",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Ocean Intelligence,{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #38bdf8, #818cf8 60%, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Spoken Naturally
          </span>
        </h1>

        {/* Sub */}
        <p
          className="mx-auto max-w-2xl"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            color: "#7dd3fc",
            lineHeight: 1.7,
            marginBottom: "2.75rem",
            opacity: 0.85,
          }}
        >
          FloatChat bridges the gap between you and deep-ocean datasets. Ask questions in plain English
          — get back visualizations, trends, and insights from the global ARGO float network instantly.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
       
         <Link to="/analyticsDashboard"
          
            className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: "linear-gradient(135deg, #0284c7, #4f46e5)",
              boxShadow: "0 0 28px rgba(56,189,248,0.25)",
              letterSpacing: "0.02em",
            }}
          >
            Start Exploring
            <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </Link>

          <a
            href="#"
            className="flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/5"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              borderColor: "rgba(56,189,248,0.3)",
              color: "#bae6fd",
              letterSpacing: "0.02em",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#38bdf8" strokeWidth="1.2" />
              <path d="M6 8l4-2.5v5L6 8z" fill="#38bdf8" />
            </svg>
            Watch Demo
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.15)" }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-6 px-4"
              style={{ background: "rgba(2,12,24,0.7)" }}
            >
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.75rem",
                  color: "#f0f9ff",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #7dd3fc, #a5b4fc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 10,
                  color: "#7dd3fc",
                  letterSpacing: "0.12em",
                  marginTop: 4,
                  opacity: 0.7,
                }}
              >
                {s.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;700&family=DM+Sans:wght@400;500;600&family=Space+Mono&display=swap');
      `}</style>
    </section>
  );
};

export default Intro;
