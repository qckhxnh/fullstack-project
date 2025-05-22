import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import HomestayDetail from './pages/HomestayDetail'
import RequireAuth from './contexts/RequireAuth'

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
      </Routes>
    </Router>
  )
}

export default App
