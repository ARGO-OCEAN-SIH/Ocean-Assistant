const people = [
  { name: 'Dhruv Chaudhary', role: 'Leader' },
  { name: 'Akash Yadav', role: 'Full Stack Developer' },
  { name: 'Chitransh Gaur', role: 'Backend Developer' },
  { name: 'Ashutosh Kumar', role: 'Front-end Developer' },
  { name: 'Bhumika Jain', role: 'Designer' },
  { name: 'Diksha Shisodia', role: 'Frontend Developer' },
]

export default function Teams() {
  return (
    <div id="teams-section" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            We’re a dynamic group of individuals passionate about what we do and dedicated to delivering the best
            results for our clients.
          </p>
        </div>

        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                {/* Avatar using UI Avatars API */}
                <img
                  alt={person.name}
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    person.name
                  )}&background=4f46e5&color=fff&size=256&rounded=true`}
                  className="size-16 rounded-full outline-1 -outline-offset-1 outline-white/10"
                />
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold text-indigo-400">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
