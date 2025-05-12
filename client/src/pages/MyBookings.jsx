import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/bookings/my')
        setBookings(res.data)
      } catch (err) {
        console.error('Failed to fetch bookings', err)
      }
    }

    fetchBookings()
  }, [refresh])

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return
    try {
      await axios.delete(`/bookings/${id}`)
      alert('Booking cancelled')
      setRefresh(!refresh)
    } catch (err) {
      alert('Failed to cancel booking')
    }
  }

  const now = new Date()
  const upcoming = bookings.filter((b) => new Date(b.endDate) >= now)
  const past = bookings.filter((b) => new Date(b.endDate) < now)

  const renderBookingCard = (b) => (
    <div
      key={b._id}
      className="border rounded-lg p-4 shadow-sm flex gap-4 items-start"
    >
      <img
        src={
          b.homestay.images[0]?.startsWith('http')
            ? b.homestay.images[0]
            : `http://localhost:3001/uploads/${b.homestay.images[0]}`
        }
        alt={b.homestay.title}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <Link
          to={`/homestays/${b.homestay._id}`}
          className="text-lg font-semibold text-blue-600 hover:underline"
        >
          {b.homestay.title}
        </Link>
        <p className="text-sm text-gray-600">{b.homestay.location}</p>
        <p className="text-sm mt-1">
          🗓 {new Date(b.startDate).toLocaleDateString()} →{' '}
          {new Date(b.endDate).toLocaleDateString()}
        </p>
        {new Date(b.endDate) >= now && (
          <button
            onClick={() => handleCancel(b._id)}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <h2 className="text-lg font-semibold mb-2">Upcoming Bookings</h2>
      {upcoming.length === 0 ? (
        <p className="text-sm">No upcoming bookings.</p>
      ) : (
        <div className="space-y-4 mb-6">{upcoming.map(renderBookingCard)}</div>
      )}

      <h2 className="text-lg font-semibold mb-2">Past Bookings</h2>
      {past.length === 0 ? (
        <p className="text-sm">No past bookings.</p>
      ) : (
        <div className="space-y-4">{past.map(renderBookingCard)}</div>
      )}
    </div>
  )
}

export default MyBookings
