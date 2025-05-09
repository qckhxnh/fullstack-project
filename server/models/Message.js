const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Message', messageSchema)
