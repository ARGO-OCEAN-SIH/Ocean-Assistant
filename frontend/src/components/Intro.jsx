import React, { useEffect, useState } from 'react';

const floatingGraphicsLeft = [
  {
    id: 1,
    svg: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="#ffffffcc"
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
        stroke="#ddddddcc"
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
        stroke="#ffffffcc"
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
        stroke="#eeeeeecc"
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
        stroke="#ffffffcc"
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
      setOffset(old => {
        if (old > 20) direction = -1;
        else if (old < -20) direction = 1;
        return old + direction;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative isolate min-h-screen px-6 pt-14 lg:px-8 overflow-hidden select-none"
      style={{
        fontFamily: "'Poppins', system-ui, sans-serif",
        backgroundImage: "url('https://wallpapercave.com/wp/wp2074532.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'white',
      }}
    >
      {/* Animated glowing blobs */}
      <div
        className="absolute rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 opacity-40 blur-3xl mix-blend-screen animate-float-slow"
        style={{
          width: 280,
          height: 280,
          top: '10%',
          left: '15%',
          animationDelay: '0s',
          animationTimingFunction: 'ease-in-out',
        }}
      />
      <div
        className="absolute rounded-full bg-gradient-to-tr from-indigo-400 via-cyan-400 to-blue-600 opacity-30 blur-2xl mix-blend-screen animate-float-slow"
        style={{
          width: 240,
          height: 240,
          top: '65%',
          left: '20%',
          animationDelay: '4s',
          animationTimingFunction: 'ease-in-out',
        }}
      />
      <div
        className="absolute rounded-full bg-gradient-to-tr from-blue-400 via-cyan-500 to-indigo-600 opacity-20 blur-3xl mix-blend-screen animate-float-slow"
        style={{
          width: 300,
          height: 300,
          top: '40%',
          right: '10%',
          animationDelay: '7s',
          animationTimingFunction: 'ease-in-out',
        }}
      />

      {/* Floating graphics left side */}
      {floatingGraphicsLeft.map(({ id, svg, baseStyle }) => (
        <div
          key={id}
          className="absolute pointer-events-none animate-soft-float"
          style={{
            top: baseStyle.top,
            left: baseStyle.left,
            transform: zigzagTransform(offset, id),
            userSelect: 'none',
            filter: 'drop-shadow(0 0 10px #ffffffcc)',
            transition: 'transform 0.15s ease-out',
            animationDelay: `${id * 1.5}s`,
          }}
        >
          {svg}
        </div>
      ))}

      {/* Floating graphics right side */}
      {floatingGraphicsRight.map(({ id, svg, baseStyle }) => (
        <div
          key={id}
          className="absolute pointer-events-none animate-soft-float"
          style={{
            top: baseStyle.top,
            right: baseStyle.right,
            transform: zigzagTransform(offset, id),
            userSelect: 'none',
            filter: 'drop-shadow(0 0 10px #ffffffcc)',
            transition: 'transform 0.15s ease-out',
            animationDelay: `${id * 1.5 + 0.75}s`,
          }}
        >
          {svg}
        </div>
      ))}

      {/* Central glowing orb */}
      <div
        aria-hidden="true"
        className="mx-auto mt-20 w-[180px] h-[180px] rounded-full bg-gradient-radial from-[#00d4ff] to-[#001f2a] shadow-glow animate-float-rotate delay-150"
        style={{
          boxShadow: '0 0 56px #00d4ffcc, 0 0 160px #001927 inset',
          animationTimingFunction: 'ease-in-out',
        }}
      >
        <div
          className="absolute top-[16px] left-[16px] w-[148px] h-[148px] rounded-full border-4 border-[#00bfff] shadow-glow-inner opacity-70"
          style={{
            filter: 'drop-shadow(0 0 14px #0099eecc)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-2xl text-center py-20 sm:py-28 lg:py-36 relative z-20">
        <h1
          className="hero-title fade-in mb-8 leading-tight"
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '4.5rem',
            fontWeight: 900,
            letterSpacing: '0.06em',
            color: 'white',
            textShadow: '0 0 24px #00c2ffcc, 0 0 36px #0092c888',
          }}
        >
          Unlock the Secrets of Our Oceans
        </h1>
        <p
          className="hero-tagline fade-in delay-300 max-w-xl mx-auto mb-14"
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '2rem',
            fontWeight: 600,
            color: 'white',
            opacity: 0.85,
            lineHeight: 1.6,
            textShadow: '0 0 20px #1dcaffcc, 0 0 28px #0b60bdaa',
          }}
        >
          Harnessing advanced data analytics to understand,
          <br />
          protect, and explore Earth’s vital marine ecosystems.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          <a
            href="#dashboard"
            className="cta-btn rounded-full px-10 py-4 text-xl font-bold transition-transform"
            style={{
              backgroundColor: '#004c66',
              color: 'white',
              boxShadow: '0 0 24px #00b0ffcc, 0 0 40px #29aaff66',
              fontFamily: "'Poppins', system-ui, sans-serif",
              letterSpacing: '0.015em',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
          >
            Explore Data
          </a>
          <a
            href="#chat"
            className="cta-btn rounded-full px-10 py-4 text-xl font-bold transition-transform"
            style={{
              backgroundColor: '#004c66',
              color: 'white',
              boxShadow: '0 0 24px #00b0ffcc, 0 0 40px #29aaff66',
              fontFamily: "'Poppins', system-ui, sans-serif",
              letterSpacing: '0.015em',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
          >
            Query Global Ocean Data
          </a>
        </div>
        {/* Partners Section */}
        <section className="mt-24">
          <h2
            className="fade-in delay-600 mb-16"
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: '2.4rem',
              color: 'white',
              letterSpacing: '0.03em',
              textShadow: '0 0 18px #18b8ff88, 0 0 28px #00aaff55',
            }}
          >
            Partners
          </h2>
          <div className="flex justify-center flex-wrap gap-20 font-semibold tracking-wide select-none">
            {[
              'OceanDataLab',
              'NOAA',
              'World Ocean Database',
              'Marine Analytics Co.',
            ].map((partner, i) => (
              <a
                key={i}
                href={`#partner${i + 1}`}
                className="partner-link relative inline-block text-2xl hover:text-white transition-colors duration-300 underline-effect"
                style={{
                  color: 'white',
                  textShadow: '0 0 14px #00cfff99',
                  fontFamily: "'Poppins', system-ui, sans-serif",
                  marginBottom: '10px',
                }}
              >
                {partner}
              </a>
            ))}
          </div>
        </section>
        {/* Navigation Links */}
        <nav className="quick-links mt-20 flex justify-center gap-16 font-bold">
          {['about', 'data', 'dashboard'].map((navItem) => (
            <a
              key={navItem}
              href={`#${navItem}`}
              className="nav-link relative px-6 py-3 rounded-full hover:text-[#00bfff] hover:bg-[#004c66] transition-colors duration-300 cursor-pointer underline-effect"
              style={{
                color: 'white',
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: '1.3rem',
                letterSpacing: '0.025em',
                textShadow: '0 0 10px #00cfff99',
              }}
            >
              {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @keyframes floatPulse {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translateY(-15px) scale(1.1);
            opacity: 0.6;
          }
        }
        .animate-float-slow {
          animation: floatPulse 8s ease-in-out infinite;
        }
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
        /* Glow shadows */
        .shadow-glow {
          box-shadow: 0 0 56px #00cfffcc, 0 0 180px #001a2b inset;
        }
        .shadow-glow-inner {
          box-shadow: 0 0 48px #00aaffdd, 0 0 98px #007bb3aa inset;
        }
        .shadow-glow-button {
          box-shadow: 0 0 22px #00bbffdd, 0 0 44px #0077ccbb;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 18px #00aaffcc);
        }
        /* Fade in */
        .fade-in {
          opacity: 0;
          animation-fill-mode: forwards;
          animation-name: fadeIn;
          animation-duration: 1.3s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
        /* Underline effect for links */
        .underline-effect::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 0;
          width: 0;
          height: 3px;
          background-color: #00bfff;
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
