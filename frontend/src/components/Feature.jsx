import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Natural Language Queries',
    description:
      'Ask questions about ocean data in plain English. From salinity profiles to BGC parameters, get answers through an intuitive chat interface.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Advanced Data Processing',
    description:
      'Powerful backend system that processes ARGO NetCDF files, stores them in structured databases, and uses vector databases for efficient retrieval.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Interactive Visualizations',
    description:
      'Explore ocean data through interactive dashboards featuring mapped trajectories, depth-time plots, and profile comparisons.',
    icon: FingerPrintIcon,
  },
  {
    name: 'AI-Powered Analysis',
    description:
      'Leverages state-of-the-art LLMs and RAG pipelines to interpret queries and provide meaningful insights from complex oceanographic data.',
    icon: LockClosedIcon,
  },
]

export default function Feature() {
  return (
    <div id="feature-section" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">Key Features</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            Democratizing Ocean Data Access
          </p>
          <p className="mt-6 text-lg/8 text-gray-300">
            Bridge the gap between domain experts, decision-makers, and raw data. Our AI-powered system makes complex oceanographic data accessible and actionable through natural language interactions.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
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
