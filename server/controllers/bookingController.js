const Booking = require('../models/Booking')
const Homestay = require('../models/Homestay')

exports.createBooking = async (req, res) => {
  try {
    const { homestayId, startDate, endDate } = req.body

    const existing = await Booking.find({
      homestay: homestayId,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    })

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ message: 'Dates conflict with existing bookings' })
    }

    const booking = await Booking.create({
      user: req.user.id,
      homestay: homestayId,
      startDate,
      endDate,
    })

    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message })
  }
}

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('homestay', 'title location images')
      .sort({ startDate: 1 })
    res.status(200).json(bookings)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
}

exports.getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate({
      path: 'homestay',
      match: { owner: req.user.id },
      populate: { path: 'owner', select: 'name email' },
    })

    const filtered = bookings.filter((b) => b.homestay) // exclude nulls if not matching
    res.status(200).json(filtered)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching host bookings', error: err.message })
  }
}

exports.getBookingsByHomestay = async (req, res) => {
  try {
    const bookings = await Booking.find({ homestay: req.params.id })
    res.status(200).json(bookings)
  } catch (err) {
    console.error('Error fetching bookings for homestay:', err)
    res.status(500).json({ message: 'Failed to fetch bookings' })
  }
}

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    if (booking.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to cancel this booking' })
    }

    await booking.deleteOne()
    res.status(200).json({ message: 'Booking cancelled' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel booking' })
  }
}
