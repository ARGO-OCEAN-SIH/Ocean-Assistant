import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'

export default function Content() {
  return (
    <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-1/2 h-[64rem] w-[64rem] -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-800"
        >
          <defs>
            <pattern
              id="grid"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <rect fill="url(#grid)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>

      {/* Center Container */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <p className="text-base font-semibold text-indigo-400">How It Works</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Smart Ocean Data Analysis
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">
          Our system transforms complex oceanographic data into accessible insights through advanced AI technology
          and intuitive visualizations. From ARGO float data to BGC parameters, explore the ocean's secrets through
          natural conversation.
        </p>

        {/* Icons List */}
        <ul className="mt-12 space-y-8 text-gray-400 text-left sm:text-center">
          <li className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-x-3">
            <CloudArrowUpIcon className="size-6 text-indigo-400 mx-auto sm:mx-0" />
            <span>
              <strong className="font-semibold text-white">Data Processing Pipeline.</strong>{' '}
              Advanced system that ingests ARGO NetCDF files and converts them into structured formats, making complex
              oceanographic data easily accessible and queryable.
            </span>
          </li>

          <li className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-x-3">
            <LockClosedIcon className="size-6 text-indigo-400 mx-auto sm:mx-0" />
            <span>
              <strong className="font-semibold text-white">AI-Powered Analysis.</strong>{' '}
              Utilizes state-of-the-art LLMs and RAG pipelines to understand natural language queries and provide
              meaningful insights from complex oceanographic data.
            </span>
          </li>

          <li className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-x-3">
            <ServerIcon className="size-6 text-indigo-400 mx-auto sm:mx-0" />
            <span>
              <strong className="font-semibold text-white">Interactive Visualization.</strong>{' '}
              Explore data through interactive dashboards featuring mapped trajectories, depth-time plots,
              and profile comparisons with intuitive controls.
            </span>
          </li>
        </ul>

        <p className="mt-10 max-w-2xl text-gray-400">
          Our system handles a wide range of oceanographic data, from satellite observations to in-situ
          measurements including CTD casts, Argo floats, and BGC sensors. The platform is designed to be extensible,
          supporting future integration of additional data sources.
        </p>

        <h2 className="mt-16 text-2xl font-bold text-white">Natural Language Queries</h2>
        <p className="mt-6 max-w-2xl text-gray-400">
          Ask questions like “Show me salinity profiles near the equator in March 2023” or
          “Compare BGC parameters in the Arabian Sea for the last 6 months”.
          Our AI system translates these natural language queries into precise database operations,
          retrieving and visualizing the exact data you need.
        </p>
      </div>
    </div>
  )
}
