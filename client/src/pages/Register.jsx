import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      )

      await axios.post('/auth/register', formData)
      alert('Registered successfully!')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed')
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default Register
