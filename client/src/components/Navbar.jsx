import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

function Navbar() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo fully left-aligned */}
        <div className="flex-1">
          <h1
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
            onClick={() => navigate('/')}
          >
            StayMate
          </h1>
        </div>

        {/* Right: Nav links and controls */}
        <div className="hidden md:flex flex-1 justify-end items-center text-gray-800 dark:text-gray-100">
          {/* Grouped links */}
          <div className="flex items-center gap-6">
            <Link to="/my-bookings" className="hover:text-blue-500 transition">
              My Bookings
            </Link>
            <Link to="/my-listings" className="hover:text-blue-500 transition">
              My Listings
            </Link>
            <Link
              to="/conversations"
              className="hover:text-blue-500 flex items-center gap-1 transition"
            >
              <span> Messages</span>
            </Link>
          </div>

          {/* Dark mode + logout pushed to right */}
          <div className="flex items-center gap-6 ml-auto">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleLogout}
              className="hover:text-red-500 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-800 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 flex flex-col gap-4 text-gray-800 dark:text-gray-100">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-500 transition"
          >
            Home
          </Link>
          <Link
            to="/my-bookings"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-500 transition"
          >
            My Bookings
          </Link>
          <Link
            to="/my-listings"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-500 transition"
          >
            My Listings
          </Link>
          <Link
            to="/conversations"
            onClick={() => setMobileOpen(false)}
            className="hover:text-blue-500 flex items-center gap-1 transition"
          >
            💬 <span>My Messages</span>
          </Link>
          <button
            onClick={() => {
              setDarkMode(!darkMode)
            }}
            className="flex items-center gap-2"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
