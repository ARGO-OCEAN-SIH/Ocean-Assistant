import React from 'react';

const Intro = () => {
  return (
    <div className="relative isolate min-h-screen px-6 pt-14 lg:px-8 bg-gradient-to-br from-[#06132b] to-[#134880] overflow-x-hidden text-[#c8f2ff] font-sans">
      {/* Glowing globe visual */}
      <div
        aria-hidden="true"
        className="mx-auto mt-20 w-[270px] h-[270px] rounded-full bg-gradient-radial from-[#1df3ff] to-[#06132b] shadow-[0_0_32px_#0aeefd44, inset_0_0_140px_#082d3e88] relative animate-glowPulse"
        style={{ boxShadow: '0 0 32px #0aeefd44, 0 0 140px #082d3e88 inset' }}
      >
        {/* Outer ring */}
        <div
          className="absolute top-[23px] left-[23px] w-[225px] h-[225px] rounded-full border-2 border-[#5edff8] shadow-[0_0_32px_#27ecfc44]"
          style={{ opacity: 0.35 }}
        />
      </div>

      <div className="mx-auto max-w-2xl text-center py-16 sm:py-24 lg:py-32">
        <h1 className="hero-title text-5xl sm:text-6xl font-extrabold tracking-wide text-[#63e2ff] drop-shadow-[0_2px_24px_#022e45]">
          Unlock the Secrets of Our Oceans
        </h1>
        <p className="hero-tagline mt-4 text-lg sm:text-xl max-w-xl mx-auto text-[#c8f2ff] text-opacity-90 font-medium leading-relaxed">
          Harnessing advanced data analytics to understand,<br />
          protect, and explore Earth’s vital marine ecosystems.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <a
            href="#dashboard"
            className="cta-btn rounded-md bg-[#18b8ff] text-[#06132b] font-bold px-7 py-3 text-sm shadow-[0_4px_24px_#067fd19a] hover:bg-[#63e2ff] hover:text-[#134880] transition-colors focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18b8ff]"
          >
            Explore Data
          </a>
          <a
            href="#chat"
            className="cta-btn rounded-md bg-[#18b8ff] text-[#06132b] font-bold px-7 py-3 text-sm shadow-[0_4px_24px_#067fd19a] hover:bg-[#63e2ff] hover:text-[#134880] transition-colors focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18b8ff]"
          >
            Query Global Ocean Data
          </a>
        </div>

        {/* Partners Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-[#63e2ff] mb-6">Partners</h2>
          <div className="flex justify-center flex-wrap gap-10 text-[#c8f2ff] text-opacity-80 font-medium">
            <a href="#partner1" className="hover:text-[#18b8ff] transition-colors">OceanDataLab</a>
            <a href="#partner2" className="hover:text-[#18b8ff] transition-colors">NOAA</a>
            <a href="#partner3" className="hover:text-[#18b8ff] transition-colors">World Ocean Database</a>
            <a href="#partner4" className="hover:text-[#18b8ff] transition-colors">Marine Analytics Co.</a>
          </div>
        </section>

        <nav className="quick-links mt-12 flex justify-center gap-10 text-[#18b8ff]">
          <a href="#about" className="hover:bg-[#63e2ff] hover:text-[#06132b] px-4 py-2 rounded-md transition-colors">
            About
          </a>
          <a href="#data" className="hover:bg-[#63e2ff] hover:text-[#06132b] px-4 py-2 rounded-md transition-colors">
            Data
          </a>
          <a href="#dashboard" className="hover:bg-[#63e2ff] hover:text-[#06132b] px-4 py-2 rounded-md transition-colors">
            Dashboard
          </a>
        </nav>
      </div>

      <style jsx>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 32px #1bbddc, 0 0 140px #082d3e88 inset;
          }
          100% {
            box-shadow: 0 0 70px #28eff9, 0 0 170px #021d3e42 inset;
          }
        }
        .animate-glowPulse {
          animation: glowPulse 3.2s infinite alternate;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(circle closest-side, #1df3ff 40%, #06132b 100%);
        }
        .cta-btn {
          display: inline-block;
          border-radius: 0.6rem;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
          cursor: pointer;
          user-select: none;
        }
        .hero-title {
          line-height: 1.1;
        }
        .hero-tagline br {
          content: "";
          margin-bottom: 0.5rem;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Intro;
