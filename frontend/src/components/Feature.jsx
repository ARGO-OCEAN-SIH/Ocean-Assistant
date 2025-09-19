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
    <div id="feature-section" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">Deploy smarter</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            AI-powered ARGO Ocean Data Discovery Platform
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Democratizing oceanographic data access through an AI conversational interface, enabling domain experts and policymakers to effortlessly explore, query, and visualize ARGO float data.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
