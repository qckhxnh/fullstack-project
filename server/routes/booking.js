const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  createBooking,
  getUserBookings,
  getHostBookings,
  getBookingsByHomestay,
  cancelBooking,
} = require('../controllers/bookingController')

router.post('/', auth, createBooking)
router.get('/my', auth, getUserBookings)
router.get('/host', auth, getHostBookings)
router.get('/homestay/:id', getBookingsByHomestay)
router.delete('/:id', auth, cancelBooking)

module.exports = router
