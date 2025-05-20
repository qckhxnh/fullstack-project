const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  createBooking,
  getUserBookings,
  getHostBookings,
} = require('../controllers/bookingController')

router.post('/', auth, createBooking)
router.get('/my', auth, getUserBookings)
router.get('/host', auth, getHostBookings)

module.exports = router
