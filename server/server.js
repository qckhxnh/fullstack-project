const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const homestayRoutes = require('./routes/homestay')

// Load env vars
dotenv.config()

// App init
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)
app.use('/api/homestays', homestayRoutes)

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
