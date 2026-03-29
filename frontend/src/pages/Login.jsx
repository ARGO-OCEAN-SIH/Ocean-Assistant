import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div
      className="flex flex-col min-h-screen text-white selection:bg-cyan-500 selection:text-gray-900"
      style={{
        backgroundImage:
          "url('https://wallpapercave.com/wp/wp2074532.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />
      <main className="flex-grow flex justify-center items-center p-4">
        <section className="relative bg-gray-800/90 rounded-3xl shadow-2xl max-w-md w-full p-8 backdrop-blur-lg border border-cyan-600 ring-1 ring-cyan-500 sm:max-w-lg sm:p-10 lg:max-w-xl">
          <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-white mb-8 tracking-wide drop-shadow-lg">
            Welcome to Ocean Assistant
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-white text-lg font-medium mb-2 select-none">
                User Name
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter Your User Name"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-cyan-500 bg-gray-900/70 text-white placeholder-cyan-400 px-4 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 shadow-md transition"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white text-lg font-medium mb-2 select-none">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-cyan-500 bg-gray-900/70 text-white placeholder-cyan-400 px-4 py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 shadow-md transition"
                autoComplete="current-password"
              />
              <div className="mt-2 text-right">
                <a href="/forgetpassword" className="text-cyan-400 hover:text-cyan-600 hover:underline font-semibold text-sm select-text">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-700 focus-visible:outline focus-visible:ring-4 focus-visible:ring-cyan-400 text-white text-lg font-bold py-3 shadow-lg transition-transform active:scale-95 select-none"
            >
              Login
            </button>
          </form>
          <p className="mt-8 text-center text-cyan-400 select-text text-sm sm:text-base">
            Don't have an account?{' '}
            <a href="/signup" className="hover:text-cyan-600 hover:underline font-semibold cursor-pointer">
              Signup
            </a>
          </p>
          {/* Subtle animated glowing wave at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-cyan-600 via-indigo-600 to-blue-600 opacity-50 animate-wave rounded-b-3xl"></div>
        </section>
      </main>

      <style jsx>{`
        .animate-wave {
          background-size: 200% 100%;
          animation: waveMove 6s linear infinite;
          mask-image: url('data:image/svg+xml;utf8,<svg width="100%" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 15 Q 25 10 50 15 T 100 15 V20 H0 Z"/></svg>');
          -webkit-mask-image: url('data:image/svg+xml;utf8,<svg width="100%" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M0 15 Q 25 10 50 15 T 100 15 V20 H0 Z"/></svg>');
        }
        @keyframes waveMove {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }
      `}</style>
    </div>
  )
}

export default Login;
