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

  const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-500">
        Home
      </Link>
      <Link to="/my-bookings" className="hover:text-blue-500">
        My Bookings
      </Link>
      <Link to="/my-listings" className="hover:text-blue-500">
        My Listings
      </Link>
      <Link to="/messages" className="hover:text-blue-500">
        Messages
      </Link>
      <button onClick={handleLogout} className="hover:text-red-500">
        Logout
      </button>
    </>
  )

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer dark:text-blue-400"
            onClick={() => navigate('/')}
          >
            StayMate
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-100">
          <NavLinks />
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu button */}
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
          <NavLinks />
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
