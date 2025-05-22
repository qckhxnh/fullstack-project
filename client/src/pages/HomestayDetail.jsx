import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function HomestayDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [home, setHome] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

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
    if (!startDate || !endDate) return alert('Choose both dates')

    try {
      await axios.post('/bookings', {
        homestayId: id,
        startDate,
        endDate,
      })
      alert('Booking successful!')
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed')
    }
  }

  if (!home) return <div className="p-10 text-center">Loading...</div>

  const img = home.images[0]?.startsWith('http')
    ? home.images[0]
    : `http://localhost:3001/uploads/${home.images[0]}`

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 text-sm rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      <img
        src={img}
        alt={home.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{home.title}</h1>
      <p className="text-gray-600 mb-2">{home.location}</p>
      <p className="mb-4">{home.description}</p>
      <p className="text-xl font-semibold mb-6">${home.price} / night</p>

      <form onSubmit={handleBooking} className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Book this homestay</h3>

        <div>
          <label className="block mb-1 text-sm">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            excludeDates={bookedDates}
            minDate={new Date()}
            placeholderText="Select start date"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            excludeDates={bookedDates}
            minDate={startDate || new Date()}
            placeholderText="Select end date"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book Now
        </button>
      </form>
    </div>
  )
}

export default HomestayDetail
