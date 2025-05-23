import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

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
    toast((t) => (
      <span className="flex flex-col gap-2">
        Delete this listing?
        <div className="flex gap-4">
          <button
            onClick={async () => {
              toast.dismiss(t.id)
              try {
                console.log('Delete request received for ID:', id)

                await axios.delete(`/homestays/${id}`)
                setHomes((prev) => prev.filter((h) => h._id !== id))
                toast.success('Listing deleted!')
              } catch (err) {
                toast.error('Delete failed')
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

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      {homes.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          You haven’t listed any homestays yet.
        </p>
      ) : (
        <div className="space-y-4">
          {homes.map((home) => (
            <div
              key={home._id}
              className="border rounded-lg p-4 flex gap-4 items-start bg-white dark:bg-gray-800 dark:border-gray-700"
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
                  className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {home.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {home.location}
                </p>
                <p className="text-sm text-gray-800 dark:text-gray-300 mt-1">
                  ${home.price} / night
                </p>
                <div className="mt-2 flex gap-4 text-sm">
                  <button
                    onClick={() => handleDelete(home._id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
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
