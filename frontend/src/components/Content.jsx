import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

export default function Content() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-animated px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 text-[#c8f2ff] font-sans">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Subtle animated ocean pattern background */}
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 opacity-40 stroke-[#18b8ff]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="oceanPattern"
              width={250}
              height={180}
              patternUnits="userSpaceOnUse"
            >
              <path d="M0 80 Q62.5 0 125 80 T250 80" strokeWidth="3" fill="none" />
            </pattern>
          </defs>
          <rect fill="url(#oceanPattern)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        {/* Header and introduction */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold text-[#1df3ff] tracking-wider uppercase fade-in">FloatChat AI Ocean Explorer</p>
              <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-[#63e2ff] drop-shadow-glow">Discover, Query & Visualize the Oceans</h1>
              <p className="mt-6 text-xl text-[#c8f2ff] text-opacity-90 font-medium fade-in delay-200">
                Revolutionizing ocean data access for everyone. FloatChat bridges the gap between vast ARGO float measurements and user-friendly discovery, using conversational AI and stunning interactive dashboards.
              </p>
            </div>
          </div>
        </div>
        {/* App Screenshot */}
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden flex justify-center items-center">
          <img
  alt="Ocean Dashboard"
  
  // src="https://raw.githubusercontent.com/ARGO-OCEAN-SIH/Ocean-Assistant/Ashu_2/frontend/src/assets/Ocean-Dashboard.png"
  src="https://raw.githubusercontent.com/pi-AshuSingh/SIH_assets/main/Ocean-Dashboard.png"
  className="max-w-full rounded-2xl shadow-glow ring-2 ring-[#18b8ff] bg-[#06132b] opacity-90"
/>
        </div>
        {/* Features and details */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-lg text-[#c8f2ff] text-opacity-80 lg:max-w-lg">
              <p>
                AI-powered queries, robust security, and interactive visualizations help researchers, policymakers, and enthusiasts unlock actionable insights from raw ARGO ocean data with zero coding. Experience mapped float locations, compare parameters, and visualize dynamic trajectories — all in a beautiful interface.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-[#c8f2ff] text-opacity-90 font-medium">
                <li className="flex gap-x-3">
                  <CloudArrowUpIcon aria-hidden="true" className="mt-1 h-6 w-6 flex-none text-[#63e2ff] drop-shadow-glow" />
                  <span>
                    <span className="font-bold text-[#1df3ff]">Natural Language Search</span>: Ask questions like "Show Indian Ocean salinity profiles for March 2023" and instantly get mapped results from ARGO floats and satellite feeds.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 h-6 w-6 flex-none text-[#63e2ff] drop-shadow-glow" />
                  <span>
                    <span className="font-bold text-[#1df3ff]">Secure Data Pipeline</span>: Converts ARGO NetCDF to SQL or Parquet, safely stored in vector and relational DBs (PostgreSQL/FAISS/Chroma) with privacy controls.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon aria-hidden="true" className="mt-1 h-6 w-6 flex-none text-[#63e2ff] drop-shadow-glow" />
                  <span>
                    <span className="font-bold text-[#1df3ff]">Interactive Dashboards</span>: Geospatial visualizations with Leaflet and Plotly; compare floats, parameters, timeseries and export tabular summaries for ocean analytics.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                By combining advanced AI models, structured databases, and easy dashboards, FloatChat democratizes oceanographic knowledge—making it accessible and impactful for everyone. 
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-[#63e2ff] drop-shadow-glow fade-in delay-400">Built for researchers, planners, and curious minds.</h2>
              <p className="mt-6">
                Expand your horizons with ARGO float data and more (CTD, BGC, gliders, buoys, and satellite). Secure, scalable, and always conversational, FloatChat is shaping the future of marine data discovery.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .bg-gradient-animated {
          background: linear-gradient(-45deg, #06132b, #134880, #0a2a53, #1c3c7d 90%);
          background-size: 400% 400%;
          animation: gradientBG 20s ease-in-out infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 70%; }
          100% { background-position: 0% 50%; }
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 14px #18b8ffbb);
        }
        .fade-in {
          opacity: 0;
          animation: fadeIn 1.3s forwards cubic-bezier(0.4,0,0.2,1);
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  )
}
