import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

function MyBookings() {
  const [bookings, setBookings] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)
  const [cancelingId, setCancelingId] = useState(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/bookings/my')
        setBookings(res.data)
      } catch (err) {
        console.error('Failed to fetch bookings', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [refresh])

  const handleCancel = async (id) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        Are you sure you want to cancel this booking?
        <div className="flex gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id)
              try {
                setCancelingId(id)
                await axios.delete(`/bookings/${id}`)
                toast.success('Booking cancelled!')
                setRefresh((prev) => !prev)
              } catch (err) {
                toast.error('Failed to cancel booking.')
              } finally {
                setCancelingId(null)
              }
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
          >
            No
          </button>
        </div>
      </span>
    ))
  }

  const now = new Date()
  const upcoming = bookings.filter((b) => new Date(b.endDate) >= now)
  const past = bookings.filter((b) => new Date(b.endDate) < now)

  const renderBookingCard = (b) => (
    <div
      key={b._id}
      className="border rounded-lg p-4 shadow-sm flex gap-4 items-start bg-white dark:bg-gray-800"
    >
      {b.homestay?.images?.[0] ? (
        <img
          src={
            b.homestay.images[0].startsWith('http')
              ? b.homestay.images[0]
              : `http://localhost:3001/uploads/${b.homestay.images[0]}`
          }
          alt={b.homestay.title ?? 'Homestay'}
          className="w-24 h-24 object-cover rounded"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
          No image
        </div>
      )}

      <div className="flex-1">
        <Link
          to={`/homestays/${b.homestay?._id}`}
          className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {b.homestay?.title ?? 'Untitled Homestay'}
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {b.homestay?.location ?? 'No location info'}
        </p>
        <p className="text-sm mt-1 text-gray-700 dark:text-gray-200">
          🗓 {new Date(b.startDate).toLocaleDateString()} →{' '}
          {new Date(b.endDate).toLocaleDateString()}
        </p>

        {new Date(b.endDate) >= now && (
          <div className="mt-2 flex flex-wrap gap-4 items-center text-sm">
            <button
              onClick={() => handleCancel(b._id)}
              disabled={cancelingId === b._id}
              className="text-red-600 dark:text-red-400 underline hover:text-red-800 dark:hover:text-red-300 disabled:opacity-50"
            >
              {cancelingId === b._id ? 'Cancelling...' : 'Cancel Booking'}
            </button>
            <Link
              to={`/chat/${b._id}`}
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
            >
              💬 Message Host
            </Link>
          </div>
        )}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-800 dark:text-gray-100">
        <svg
          className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
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
        Loading your bookings...
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        My Bookings
      </h1>

      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Upcoming Bookings
      </h2>
      {upcoming.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          There are no upcoming bookings.
        </p>
      ) : (
        <div className="space-y-4 mb-6">{upcoming.map(renderBookingCard)}</div>
      )}

      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
        Past Bookings
      </h2>
      {past.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          There are no past bookings.
        </p>
      ) : (
        <div className="space-y-4">{past.map(renderBookingCard)}</div>
      )}
    </div>
  )
}

export default MyBookings
