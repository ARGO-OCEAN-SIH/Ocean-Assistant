'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Dashboard', href: '/' },
  { name: 'Voice Assistant', href: '/voice' },
  { name: 'About', href: '#feature', targetId: 'feature-section' },
  { name: 'Team', href: '#teams', targetId: 'teams-section' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)


  const handleNavClick = (item, e) => {
    if (item.targetId) {
      e.preventDefault()
      if (location.pathname === '/home') {
        document.getElementById(item.targetId)?.scrollIntoView({ behavior: 'smooth' })
        setMobileMenuOpen(false)
      } else {
        window.location.href = `/home#${item.targetId}`
      }
      setMobileMenuOpen(false)
    }
  }


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

 return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 shadow-xl backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto xl:px-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <Link to="/" aria-label="Homepage" title="Homepage">
              <img
  src="https://static.vecteezy.com/system/resources/thumbnails/006/962/084/small/abstract-circle-shape-with-beach-wave-inside-free-vector.jpg"
  alt="Abstract ocean wave logo"
  className="h-10 w-auto object-contain rounded-full shadow-lg"
/>
            </Link>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-300 via-indigo-400 to-cyan-400 bg-clip-text text-transparent select-text cursor-default select-none">
              Ocean Assistant
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:gap-x-10 font-semibold uppercase text-white tracking-wide">
            {navigation.map((item) =>
              item.targetId ? (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={e => handleNavClick(item, e)}
                  className="relative px-2 py-1 hover:text-cyan-400 transition-all after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-cyan-400 after:origin-right after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  to={item.href}
                  key={item.name}
                  className={`relative px-2 py-1 ${
                    location.pathname === item.href ? 'text-cyan-400' : 'text-white'
                  } hover:text-cyan-400 transition-all after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-cyan-400 after:origin-right after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Sign in link */}
          <div className="hidden lg:flex items-center">
            <Link to="/login" className="text-white px-4 py-2 rounded-md border border-cyan-500 bg-cyan-600 hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-shadow font-semibold">
              Log in
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 hover:bg-cyan-700/20 transition"
              aria-label="Open mobile menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Slide-out Menu */}
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden fixed z-50 inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Panel className="pointer-events-auto absolute top-0 right-0 w-full max-w-xs p-6 bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900 shadow-lg h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <img
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                  <span className="text-white text-2xl font-bold">Ocean Assistant</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white p-2 rounded-md hover:bg-cyan-700/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navigation.map(item => (
                  item.targetId ? (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        if (window.location.pathname === '/home') {
                          document.getElementById(item.targetId)?.scrollIntoView({ behavior: 'smooth' })
                        } else {
                          window.location.href = `/home#${item.targetId}`
                        }
                        setMobileMenuOpen(false)
                      }}
                      className="text-white uppercase text-lg font-semibold px-3 py-2 rounded-lg hover:bg-cyan-700 transition"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      key={item.name}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white uppercase text-lg font-semibold px-3 py-2 rounded-lg hover:bg-cyan-700 transition"
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center bg-cyan-600 hover:bg-cyan-700 px-4 py-3 rounded-md font-semibold text-white transition shadow-lg"
                >
                  Log in
                </Link>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

      </header>

      <style jsx>{`
        @keyframes glowPulse {
          0%, 100% {
            text-shadow:
              0 0 6px #00e0ff,
              0 0 12px #00c8ff,
              0 0 18px #00aaff,
              0 0 24px #0088dd;
          }
          50% {
            text-shadow:
              0 0 12px #00e0ff,
              0 0 18px #00c8ff,
              0 0 24px #00aaff,
              0 0 30px #0088dd;
          }
        }

        .animate-pulse {
          animation: glowPulse 2.5s ease-in-out infinite;
        }

        nav a {
          transition: all 0.3s ease;
        }
        nav a:hover {
          transform: scale(1.05);
          text-shadow: 0 0 10px #00e0ff;
        }
        header {
          backdrop-filter: saturate(180%) blur(8px);
        }
      `}</style>
    </>
  )
}
