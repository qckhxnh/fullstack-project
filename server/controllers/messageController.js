const Message = require('../models/Message')

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, bookingId, message } = req.body

    const newMsg = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      booking: bookingId || null,
      message,
    })

    res.status(201).json(newMsg)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to send message', error: err.message })
  }
}

exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ sentAt: 1 }) // chronological

    res.status(200).json(messages)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch messages', error: err.message })
  }
}
