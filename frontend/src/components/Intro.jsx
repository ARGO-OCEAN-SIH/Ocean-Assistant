import React, { useEffect, useState } from 'react';

const floatingTextsLeft = [
  { id: 1, text: 'Data', style: { top: '10%', left: '10%', color: '#18b8ff' } },
  { id: 3, text: 'AI', style: { top: '30%', left: '5%', color: '#1df3ff' } },
  { id: 6, text: 'Marine', style: { top: '50%', left: '12%', color: '#1df3ff' } },
  { id: 9, text: 'Protection', style: { top: '70%', left: '10%', color: '#1df3ff' } },
];

const floatingTextsRight = [
  { id: 2, text: 'Oceans', style: { top: '15%', right: '12%', color: '#63e2ff' } },
  { id: 4, text: 'Insights', style: { top: '40%', right: '15%', color: '#18b8ff' } },
  { id: 5, text: 'Explore', style: { top: '60%', right: '10%', color: '#63e2ff' } },
  { id: 7, text: 'Ecosystems', style: { top: '80%', right: '12%', color: '#18b8ff' } },
  { id: 8, text: 'Sustainability', style: { top: '90%', right: '15%', color: '#63e2ff' } },
];

const floatingGraphicsLeft = [
  {
    id: 1,
    svg: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#18b8ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
      >
        <circle cx="32" cy="32" r="30" />
        <path d="M12 44c8-12 32-12 40 0" />
        <circle cx="32" cy="32" r="8" />
      </svg>
    ),
    baseStyle: { top: '20%', left: '5%' },
  },
  {
    id: 3,
    svg: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#1df3ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M2 32 L22 22 L42 32 L22 42 Z" />
        <circle cx="52" cy="32" r="10" />
        <circle cx="52" cy="32" r="5" />
      </svg>
    ),
    baseStyle: { top: '65%', left: '8%' },
  },
];

const floatingGraphicsRight = [
  {
    id: 2,
    svg: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#63e2ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12"
      >
        <path d="M32 4 L36 24 L56 24 L38 34 L44 54 L32 42 L20 54 L26 34 L8 24 L28 24 Z" />
      </svg>
    ),
    baseStyle: { top: '30%', right: '8%' },
  },
  {
    id: 4,
    svg: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#18b8ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9"
      >
        <path d="M2 40c8-12 16 12 24 0s16-12 24 0 16 12 24 0" />
      </svg>
    ),
    baseStyle: { top: '50%', right: '12%' },
  },
  {
    id: 5,
    svg: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#63e2ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-14 h-14"
      >
        <path d="M32 4v56 M32 4c10 10 20 20 10 40M32 4c-10 10-20 20-10 40M42 30l10 10M22 30l-10 10" />
      </svg>
    ),
    baseStyle: { top: '70%', right: '10%' },
  },
];

const zigzagTransform = (offset, id) => {
  const xMove = Math.sin((offset + id * 50) / 15) * 20;
  const yMove = Math.cos((offset + id * 30) / 10) * 12;
  const rotate = (offset + id * 40) / 15;
  return `translate(${xMove}px, ${yMove}px) rotate(${rotate}deg)`;
};

const Intro = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let direction = 1;
    const interval = setInterval(() => {
      setOffset((old) => {
        if (old > 20) direction = -1;
        else if (old < -20) direction = 1;
        return old + direction;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate min-h-screen px-6 pt-14 lg:px-8 overflow-x-hidden text-[#c8f2ff] font-sans bg-gradient-animated overflow-visible select-none">
      {/* Floating texts left side */}
      {floatingTextsLeft.map(({ id, text, style }) => (
        <span
          key={id}
          className="absolute font-extrabold pointer-events-none text-glow text-3xl transform-origin-center animate-rotate-slow"
          style={{
            ...style,
            transform: `translateY(${Math.sin((offset + id * 20) / 10) * 8}px) rotate(${(offset + id * 40) / 10}deg)`,
            userSelect: 'none',
          }}
        >
          {text}
        </span>
      ))}

      {/* Floating texts right side */}
      {floatingTextsRight.map(({ id, text, style }) => (
        <span
          key={id}
          className="absolute font-extrabold pointer-events-none text-glow text-3xl transform-origin-center animate-rotate-slow"
          style={{
            ...style,
            transform: `translateY(${Math.sin((offset + id * 20) / 12) * 8}px) rotate(${(offset + id * 40) / 12}deg)`,
            userSelect: 'none',
          }}
        >
          {text}
        </span>
      ))}

      {/* Floating graphics left side */}
      {floatingGraphicsLeft.map(({ id, svg, baseStyle }) => (
        <div
          key={id}
          className="absolute pointer-events-none"
          style={{
            top: baseStyle.top,
            left: baseStyle.left,
            transform: zigzagTransform(offset, id),
            userSelect: 'none',
            filter: 'drop-shadow(0 0 6px #18b8ffcc)',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {svg}
        </div>
      ))}

      {/* Floating graphics right side */}
      {floatingGraphicsRight.map(({ id, svg, baseStyle }) => (
        <div
          key={id}
          className="absolute pointer-events-none"
          style={{
            top: baseStyle.top,
            right: baseStyle.right,
            transform: zigzagTransform(offset, id),
            userSelect: 'none',
            filter: 'drop-shadow(0 0 6px #63e2ffcc)',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {svg}
        </div>
      ))}

      {/* Glowing globe visual */}
      <div
        aria-hidden="true"
        className="mx-auto mt-20 w-[280px] h-[280px] rounded-full bg-gradient-radial from-[#1df3ff] to-[#06132b] shadow-glow animate-float-rotate delay-150"
        style={{ boxShadow: '0 0 48px #0aeefd99, 0 0 200px #082d4d inset' }}
      >
        <div
          className="absolute top-[24px] left-[24px] w-[232px] h-[232px] rounded-full border-4 border-[#5edff8] shadow-glow-inner opacity-50"
          style={{ filter: 'drop-shadow(0 0 12px #18b8ffcc)' }}
        />
      </div>

      <div className="mx-auto max-w-2xl text-center py-20 sm:py-28 lg:py-36 relative z-20">
        <h1 className="hero-title fade-in text-7xl lg:text-8xl font-extrabold tracking-wide text-[#63e2ff] drop-shadow-[0_0_30px_rgba(0,255,255,0.8)] mb-8 leading-tight">
          Unlock the Secrets of Our Oceans
        </h1>
        <p className="hero-tagline fade-in delay-300 text-2xl md:text-3xl max-w-xl mx-auto text-[#c8f2ff] text-opacity-90 font-semibold leading-relaxed mb-14">
          Harnessing advanced data analytics to understand,<br />
          protect, and explore Earth’s vital marine ecosystems.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          <a
            href="#dashboard"
            className="cta-btn rounded-full bg-[#18b8ff] text-[#06132b] font-extrabold px-10 py-4 text-xl shadow-glow-button transform transition duration-400 hover:scale-110 hover:bg-[#63e2ff] hover:text-[#134880] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#18b8ff]"
            aria-label="Explore Data"
          >
            Explore Data
          </a>
          <a
            href="#chat"
            className="cta-btn rounded-full bg-[#18b8ff] text-[#06132b] font-extrabold px-10 py-4 text-xl shadow-glow-button transform transition duration-400 hover:scale-110 hover:bg-[#63e2ff] hover:text-[#134880] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#18b8ff]"
            aria-label="Query Global Ocean Data"
          >
            Query Global Ocean Data
          </a>
        </div>
        {/* Partners Section */}
        <section className="mt-24">
          <h2 className="text-5xl font-semibold text-[#63e2ff] mb-16 fade-in delay-600 drop-shadow-glow">
            Partners
          </h2>
          <div className="flex justify-center flex-wrap gap-20 text-[#c8f2ff] text-opacity-90 font-semibold tracking-wide select-none">
            {['OceanDataLab', 'NOAA', 'World Ocean Database', 'Marine Analytics Co.'].map((partner, i) => (
              <a
                key={i}
                href={`#partner${i + 1}`}
                className="partner-link relative inline-block text-2xl hover:text-[#18b8ff] transition-colors duration-300 underline-effect"
              >
                {partner}
              </a>
            ))}
          </div>
        </section>
        {/* Navigation Links */}
        <nav className="quick-links mt-20 flex justify-center gap-16 text-[#18b8ff] font-bold">
          {['about', 'data', 'dashboard'].map((navItem) => (
            <a
              key={navItem}
              href={`#${navItem}`}
              className="nav-link relative px-6 py-3 rounded-full hover:text-[#134880] hover:bg-[#63e2ff] transition-colors duration-300 cursor-pointer underline-effect"
            >
              {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        /* Animated gradient background */
        .bg-gradient-animated {
          background: linear-gradient(-45deg, #06132b, #134880, #0a2a53, #1c3c7d);
          background-size: 400% 400%;
          animation: gradientBG 25s ease infinite;
        }
        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        /* Floating & rotating globe animation */
        @keyframes floatRotate {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(7deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float-rotate {
          animation: floatRotate 8s ease-in-out infinite;
        }
        /* Glow shadows for globe and buttons */
        .shadow-glow {
          box-shadow: 0 0 55px #1df3ffaa, 0 0 140px #08aaffbb inset;
        }
        .shadow-glow-inner {
          box-shadow: 0 0 38px #18b8ffdd, 0 0 90px #18b8ffaa inset;
        }
        .shadow-glow-button {
          box-shadow: 0 0 22px #18b8ffdd, 0 0 40px #18b8ffbb;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 15px #18b8ffcc);
        }
        /* Fade in sequential animation */
        .fade-in {
          opacity: 0;
          animation-fill-mode: forwards;
          animation-name: fadeIn;
          animation-duration: 1.3s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        /* Floating text glow */
        .text-glow {
          text-shadow: 0 0 15px rgba(29, 243, 255, 0.8),
            0 0 30px rgba(24, 184, 255, 0.6), 0 0 40px rgba(54, 199, 255, 0.5);
          color: #18b8ffdd;
          user-select: none;
          position: absolute;
          font-family: 'Poppins', sans-serif;
          pointer-events: none;
          white-space: nowrap;
          font-weight: 900;
          z-index: 15;
        }
        /* Underline effect for links */
        .underline-effect::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #18b8ff;
          border-radius: 4px;
          transition: width 0.4s ease;
          z-index: 10;
        }
        .underline-effect:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Intro;
