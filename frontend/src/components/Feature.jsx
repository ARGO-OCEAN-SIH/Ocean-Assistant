import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI-Powered Querying',
    description:
      'Leverages large language models with Retrieval-Augmented Generation (RAG) to interpret natural language queries and fetch ARGO oceanographic data reliably.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Data Storage',
    description:
      'Processes ARGO NetCDF data into structured SQL/Parquet formats and stores securely in relational and vector databases like PostgreSQL and FAISS/Chroma.',
    icon: LockClosedIcon,
  },
  {
    name: 'Interactive Visualizations',
    description:
      'Provides intuitive dashboards with geospatial maps, depth-time plots, and profile comparisons using tools like Plotly and Leaflet for rich insight into ocean data.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Advanced Security & Privacy',
    description:
      'Implements robust authentication and data privacy measures safeguarding sensitive oceanographic metadata and user interactions.',
    icon: FingerPrintIcon,
  },
]

export default function Feature() {
  return (
    <section
      id="feature-section"
      className="relative bg-gradient-to-b from-[#001021] to-[#00040f] py-24 sm:py-32 overflow-hidden"
    >
      {/* Animated background blobs */}
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-36 h-[480px] w-[480px] rounded-full bg-indigo-700 opacity-20 blur-[150px] animate-blob animation-delay-2000 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute top-36 right-20 h-[320px] w-[320px] rounded-full bg-cyan-500 opacity-30 blur-[120px] animate-blob mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-20 h-[600px] w-[600px] rounded-full bg-blue-500 opacity-20 blur-[180px] animate-blob animation-delay-4000 mix-blend-multiply"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold tracking-wide text-cyan-400 uppercase animate-pulse">
            Ocean Assistant
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            AI-powered ARGO Ocean Discovery Platform
          </p>
          <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto">
            Democratizing oceanographic data access through an AI conversational interface, enabling domain experts and policymakers to effortlessly explore, query, and visualize ARGO float data.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 gap-y-10 gap-x-12 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative rounded-3xl bg-gray-900 bg-opacity-30 p-8 shadow-lg ring-1 ring-cyan-600 hover:ring-cyan-400 hover:translate-y-[-8px] transition-transform flex flex-col"
            >
              <dt>
                <div className="absolute -inset-1 flex items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-600 opacity-25 blur-md transition-opacity group-hover:opacity-100"></div>
                <feature.icon className="relative h-12 w-12 text-cyan-400 group-hover:text-indigo-400" aria-hidden="true" />
                <p className="relative mt-6 text-xl font-semibold text-white">{feature.name}</p>
              </dt>
              <dd className="relative mt-4 flex-grow text-gray-300">{feature.description}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Extra vibes and sparkle */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute bg-cyan-400 rounded-full opacity-40 animate-fadeInOut"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 4}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-fadeInOut {
          animation: fadeInOut 6s infinite ease-in-out;
        }
      `}</style>
    </section>
  )
}
