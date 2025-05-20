import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import HomestayDetail from './pages/HomestayDetail'
import RequireAuth from './contexts/RequireAuth'
import MyBookings from './pages/MyBookings'
import MyListings from './pages/MyListings'
import Navbar from './components/Navbar'
import CreateHomestay from './pages/CreateHomestay'
import Chat from './pages/Chat'
import Conversations from './pages/Conversations'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/chat/:bookingId"
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            path="/conversations"
            element={
              <RequireAuth>
                <Conversations />
              </RequireAuth>
            }
          />
          <Route
            path="/create-homestay"
            element={
              <RequireAuth>
                <CreateHomestay />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/homestays/:id" element={<HomestayDetail />} />
          <Route
            path="/my-bookings"
            element={
              <RequireAuth>
                <MyBookings />
              </RequireAuth>
            }
          />
          <Route
            path="/my-listings"
            element={
              <RequireAuth>
                <MyListings />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
