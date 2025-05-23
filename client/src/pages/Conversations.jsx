import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

function Conversations() {
  const [conversations, setConversations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await axios.get('/messages')
        setConversations(res.data)
      } catch (err) {
        setError('Failed to load conversations')
      }
    }

    fetchConversations()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Conversations</h1>

      {error && (
        <p className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 px-3 py-2 rounded mb-4">
          {error}
        </p>
      )}

      {conversations.length === 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          No conversations yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {conversations.map((c) => {
            const lastMessage = c.messages[c.messages.length - 1]
            const partnerIsHost =
              c.hostId !==
              JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
            const partnerRole = partnerIsHost ? 'Host' : 'Renter'

            return (
              <li
                key={c._id}
                className="border rounded-lg p-4 bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {c.bookingId?.homestay?.title || 'Homestay'}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      With {partnerRole}
                    </p>
                    {lastMessage && (
                      <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 truncate">
                        {lastMessage.text}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/chat/${c.bookingId?._id}`}
                    className="text-sm text-blue-500 underline hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Open Chat
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Conversations
