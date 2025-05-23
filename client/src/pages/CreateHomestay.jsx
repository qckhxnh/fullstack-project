import { useState } from 'react'
import axios from '../api/axios'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function CreateHomestay() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    location: '',
    description: '',
    price: '',
    imageUrls: [],
  })
  const [availability, setAvailability] = useState([])
  const [images, setImages] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files))
  }

  const handleRemoveDate = (date) => {
    setAvailability(
      availability.filter((d) => d.toDateString() !== date.toDateString())
    )
  }

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

    const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: data,
    })

    const json = await res.json()
    return json.secure_url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!form.title || !form.location || !form.price) {
      toast.error('Title, location, and price are required.')
      setLoading(false)
      return
    }

    try {
      const uploadedImageUrls = []

      for (const image of images) {
        const url = await uploadImageToCloudinary(image)
        uploadedImageUrls.push(url)
      }

      const data = new FormData()
      data.append('title', form.title)
      data.append('location', form.location)
      data.append('description', form.description)
      data.append('price', form.price)
      data.append('availability', JSON.stringify(availability))
      data.append(
        'imageUrls',
        JSON.stringify([...uploadedImageUrls, ...(form.imageUrls || [])])
      )

      await axios.post('/homestays', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success('Homestay created successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create homestay.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Homestay</h1>

      {error && (
        <p className="mb-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-sm px-3 py-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
        />
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          rows={3}
          disabled={loading}
          className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
        />
        <input
          type="number"
          name="price"
          placeholder="Price per night"
          value={form.price}
          onChange={handleInputChange}
          disabled={loading}
          className="w-full p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
        />

        <label className="block text-sm font-semibold">Upload Images</label>
        <input
          type="file"
          name="images"
          onChange={handleImageUpload}
          multiple
          disabled={loading}
          className="w-full text-sm disabled:opacity-50"
        />

        <div className="flex flex-wrap gap-2 mt-2 text-sm">
          {availability.map((date) => (
            <span
              key={date.toISOString()}
              onClick={() => handleRemoveDate(date)}
              className="px-3 py-1 bg-green-200 dark:bg-green-600 rounded cursor-pointer hover:bg-green-300 dark:hover:bg-green-500"
            >
              {date.toDateString()} ✕
            </span>
          ))}
        </div>

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
            'Create Homestay'
          )}
        </button>
      </form>
    </div>
  )
}

export default CreateHomestay
