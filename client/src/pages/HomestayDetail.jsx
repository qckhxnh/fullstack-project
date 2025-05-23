import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'

function HomestayDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [home, setHome] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]))
      setUserId(decoded.id)
    }
  }, [])

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const res = await axios.get(`/homestays/${id}`)
        setHome(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/bookings/homestay/${id}`)
        const dates = []

        res.data.forEach((booking) => {
          const start = new Date(booking.startDate)
          const end = new Date(booking.endDate)
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d))
          }
        })

        setBookedDates(dates)
      } catch (err) {
        console.error('Failed to fetch bookings:', err)
      }
    }

    fetchHomestay()
    fetchBookings()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!startDate || !endDate) return toast.error('Choose both dates')
    if (home?.owner?._id === userId) {
      return toast.error('You cannot book your own homestay.')
    }

    setLoading(true)
    try {
      await axios.post('/bookings', {
        homestayId: id,
        startDate,
        endDate,
      })
      toast.success('Booking successful!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  if (!home)
    return (
      <div className="p-10 text-center text-gray-800 dark:text-gray-100">
        Loading...
      </div>
    )

  const img = home.images[0]?.startsWith('http')
    ? home.images[0]
    : `http://localhost:3001/uploads/${home.images[0]}`

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        ← Back
      </button>

      <img
        src={img}
        alt={home.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {home.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300">{home.location}</p>
      <p className="mb-4 text-gray-800 dark:text-gray-200">
        {home.description}
      </p>
      <p className="text-xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
        ${home.price} / night
      </p>

      <form onSubmit={handleBooking} className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Book this homestay</h3>

        <div>
          <label className="block mb-1 text-sm">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            excludeDates={bookedDates}
            minDate={new Date()}
            disabled={loading}
            placeholderText="Select start date"
            className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            excludeDates={bookedDates}
            minDate={startDate || new Date()}
            disabled={loading}
            placeholderText="Select end date"
            className="w-full border p-2 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition flex items-center justify-center disabled:opacity-50"
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
            'Book Now'
          )}
        </button>
      </form>
    </div>
  )
}

export default HomestayDetail
