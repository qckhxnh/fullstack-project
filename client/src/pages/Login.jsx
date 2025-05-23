import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      toast.success('Login successful!')
      navigate('/')
    } catch (err) {
      const message =
        err.response?.data?.message || 'Invalid credentials. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Login to StayMate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={loading}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            disabled={loading}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 dark:text-blue-400 underline"
            disabled={loading}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
