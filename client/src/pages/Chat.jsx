import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'

function Chat() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      const res = await axios.post('/messages', {
        bookingId,
        text,
      })
      setMessages([...messages, res.data])
      setText('')
    } catch (err) {
      setError('Failed to send message')
    }
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/messages/${bookingId}`)
        setMessages(res.data)
      } catch (err) {
        setError('Failed to load messages')
      }
    }

    fetchMessages()
  }, [bookingId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow text-gray-900 dark:text-gray-100 flex flex-col h-[70vh]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold">Conversation</h2>
      </div>

      <div className="flex-grow overflow-y-auto border border-gray-300 dark:border-gray-700 rounded p-3 space-y-2 mb-4 bg-gray-100 dark:bg-gray-900">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-xs px-3 py-2 rounded text-sm break-words ${
              msg.senderId ===
              JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id
                ? 'ml-auto bg-blue-600 text-white'
                : 'mr-auto bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <p className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 text-sm rounded p-2 mb-3">
          {error}
        </p>
      )}

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default Chat
