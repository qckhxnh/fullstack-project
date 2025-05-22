import { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom'

function Home() {
  const [homes, setHomes] = useState([])

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await axios.get('/homestays')
        setHomes(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchHomes()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Homestays</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {homes.map((home) => (
          <Link
            to={`/homestays/${home._id}`}
            key={home._id}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <img
              src={
                home.images[0]?.startsWith('http')
                  ? home.images[0]
                  : `http://localhost:3000/uploads/${home.images[0]}`
              }
              alt={home.title}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{home.title}</h2>
            <p className="text-sm text-gray-600">{home.location}</p>
            <p className="text-blue-600 font-medium">${home.price} / night</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
