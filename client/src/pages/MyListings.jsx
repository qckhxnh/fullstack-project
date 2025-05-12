import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'

function MyListings() {
  const [homes, setHomes] = useState([])

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const res = await axios.get('/homestays/my')
        setHomes(res.data)
      } catch (err) {
        console.error('Failed to fetch listings', err)
      }
    }

    fetchMyListings()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return
    try {
      await axios.delete(`/homestays/${id}`)
      setHomes(homes.filter((h) => h._id !== id))
      alert('Listing deleted')
    } catch (err) {
      alert('Delete failed')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      {homes.length === 0 ? (
        <p>You haven’t listed any homestays yet.</p>
      ) : (
        <div className="space-y-4">
          {homes.map((home) => (
            <div
              key={home._id}
              className="border p-4 rounded-lg flex gap-4 items-start"
            >
              <img
                src={
                  home.images[0]?.startsWith('http')
                    ? home.images[0]
                    : `http://localhost:3001/uploads/${home.images[0]}`
                }
                alt={home.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <Link
                  to={`/homestays/${home._id}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {home.title}
                </Link>
                <p className="text-sm text-gray-600">{home.location}</p>
                <p className="text-sm text-gray-800 mt-1">
                  ${home.price} / night
                </p>
                <div className="mt-2 flex gap-4 text-sm">
                  <Link
                    to={`/edit-homestay/${home._id}`}
                    className="text-green-600 hover:underline"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(home._id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyListings
