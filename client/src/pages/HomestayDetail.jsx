import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'

function HomestayDetail() {
  const { id } = useParams()
  const [home, setHome] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const res = await axios.get(`/homestays/${id}`)
        setHome(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchHomestay()
  }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!startDate || !endDate) return alert('Choose both dates')

    const start = new Date(startDate)
    const end = new Date(endDate)

    const requestedDates = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      requestedDates.push(new Date(d).toISOString().split('T')[0])
    }

    const availableDates = home.availability.map(
      (d) => new Date(d).toISOString().split('T')[0]
    )
    const isAllAvailable = requestedDates.every((date) =>
      availableDates.includes(date)
    )

    if (!isAllAvailable) {
      return alert('One or more selected dates are not available.')
    }

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
    : `http://localhost:3000/uploads/${home.images[0]}`

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={img}
        alt={home.title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{home.title}</h1>
      <p className="text-gray-600 mb-2">{home.location}</p>
      <p className="mb-4">{home.description}</p>
      <p className="text-xl font-semibold mb-6">${home.price} / night</p>

      <h2 className="font-medium mb-2">Available Dates:</h2>
      <ul className="flex flex-wrap gap-2 text-sm mb-6">
        {home.availability.map((date) => (
          <li
            key={date}
            className="bg-green-100 text-green-800 px-2 py-1 rounded"
          >
            {new Date(date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <form onSubmit={handleBooking} className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold">Book Now</h3>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book
        </button>
      </form>
    </div>
  )
}

export default HomestayDetail
