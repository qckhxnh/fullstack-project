const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// Basic route
app.get('/', (req, res) => {
  res.send('StayMate Backend is running!')
})

// Connect to MongoDB and start server
const PORT = process.env.PORT || 6000
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err))
