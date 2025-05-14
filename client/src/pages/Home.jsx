import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const [homes, setHomes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get('/homestays')
        setHomes(res.data)
      } catch (err) {
        console.error('Failed to fetch homestays:', err)
      }
    }

    fetchHomes()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Explore Homestays
        </h1>
        <button
          onClick={() => navigate('/create-homestay')}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Homestay
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {homes.map((home) => (
          <Link
            key={home._id}
            to={`/homestays/${home._id}`}
            className="border rounded-lg p-4 hover:shadow-md transition bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src={
                home.images[0]?.startsWith('http')
                  ? home.images[0]
                  : `http://localhost:3001/uploads/${home.images[0]}`
              }
              alt={home.title}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {home.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {home.location}
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              ${home.price} / night
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
