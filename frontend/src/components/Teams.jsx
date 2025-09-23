import React, { useState } from "react";

const people = [
  { name: "Dhruv Chaudhary", role: "Team Leader", imgSrc: "https://randomuser.me/api/portraits/men/45.jpg", contact: "+91 75056 25946" },
  { name: "Bhumika Jain", role: "Team Member", imgSrc: "https://randomuser.me/api/portraits/women/65.jpg", contact: "+91 82733 82060" },
  { name: "Diksha Sisodia", role: "Team Member", imgSrc: "https://randomuser.me/api/portraits/women/67.jpg", contact: "+91 82183 16073" },
  { name: "Chitransh Gaur", role: "Team Member", imgSrc: "https://randomuser.me/api/portraits/men/52.jpg", contact: "+91 90272 57545" },
  { name: "Akash Yadav", role: "Team Member", imgSrc: "https://randomuser.me/api/portraits/men/57.jpg", contact: "+91 73072 90235" },
  { name: "Ashutosh Kumar", role: "Team Member", imgSrc: "https://randomuser.me/api/portraits/men/50.jpg", contact: "+91 90609 48710" },
];

export default function Teams() {
  const [visibleContact, setVisibleContact] = useState(null);

  const toggleContact = (name) => {
    if (visibleContact === name) setVisibleContact(null);
    else setVisibleContact(name);
  };

  return (
   <div
  id="teams-section"
  className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 text-[#ccefff] font-sans select-none"
  style={{
    backgroundImage: `url('https://cdn.pixabay.com/photo/2014/02/26/21/25/jellyfish-275577_1280.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
  }}
>

      <div className="mx-auto max-w-7xl">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-cyan-400 drop-shadow-lg sm:text-5xl mb-6">
            Meet Our Stellar Team
          </h2>
          <p className="text-cyan-200">
            Passionate minds united to revolutionize ocean data understanding with AI-powered innovations.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-12 mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          {people.map(({ name, role, imgSrc, contact }) => (
            <li
              key={name}
              className="group relative flex flex-col items-center bg-[#072640] rounded-2xl p-6 shadow-lg shadow-cyan-600 transition-transform transform hover:scale-105 cursor-pointer"
              tabIndex={0}
              aria-label={`Team member ${name}, role: ${role}`}
            >
              <div className="relative">
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-cyan-500 shadow-cyan-600 shadow-lg">
                  <img
                    src={imgSrc}
                    alt={`Portrait of ${name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                {role === "Team Leader" && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-purple-600 to-cyan-400 text-black px-3 py-1 rounded-full shadow-lg shadow-cyan-800 whitespace-nowrap flex items-center gap-1 select-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Leader
                  </div>
                )}
              </div>
              <h3 className="mt-8 text-xl font-semibold text-white tracking-wide">{name}</h3>
              <p className="mt-1 text-cyan-400">{role}</p>
              <button
                type="button"
                onClick={() => toggleContact(name)}
                className="mt-6 px-6 py-2 rounded-full border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-[#072640] transition-colors font-semibold text-sm"
                aria-label={`Contact ${name}`}
              >
                {visibleContact === name ? contact : "Contact"}
              </button>
            </li>
          ))}
        </ul>
        <section className="max-w-3xl mx-auto text-center mt-20 border-t border-cyan-600 pt-6">
          <h3 className="text-xl font-semibold text-cyan-400 drop-shadow-lg">Team: NovaMinds</h3>
          <p className="text-cyan-300">SIH Problem Statement ID: SIH25040</p>
        </section>
      </div>
      <style jsx>{`
        .drop-shadow-lg {
          filter: drop-shadow(0 0 20px #22d3ee);
        }
      `}</style>
    </div>
  );
}
