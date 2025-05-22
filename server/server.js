const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const homestayRoutes = require('./routes/homestay')
const bookingRoutes = require('./routes/booking')
const messageRoutes = require('./routes/message')
const errorHandler = require('./middleware/errorHandler')

// Load env vars
dotenv.config()

// App init
const app = express()

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(errorHandler)

// Routes
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)
app.use('/api/homestays', homestayRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/messages', messageRoutes)

// Default route
app.get('/', (req, res) => {
  res.send('StayMate Backend is running!')
})

// DB connection and server start
const PORT = process.env.PORT || 6000
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err))
