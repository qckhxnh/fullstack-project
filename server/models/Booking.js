const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  homestay: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Homestay',
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Booking', bookingSchema)
