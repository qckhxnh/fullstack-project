import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      )

      await axios.post('/auth/register', formData)
      toast.success('Registered successfully!')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create Your Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            disabled={loading}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={loading}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
            disabled={loading}
            className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded transition flex items-center justify-center disabled:opacity-50"
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
              'Register'
            )}
          </button>
        </form>

        <p className="text-sm mt-4 text-center text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            disabled={loading}
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register
