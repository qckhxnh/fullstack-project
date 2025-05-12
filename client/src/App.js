import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import HomestayDetail from './pages/HomestayDetail'
import RequireAuth from './contexts/RequireAuth'
import MyBookings from './pages/MyBookings'
import MyListings from './pages/MyListings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
    </Router>
  )
}

export default App
