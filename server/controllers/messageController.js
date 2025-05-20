const Conversation = require('../models/Conversation')

exports.getMessages = async (req, res) => {
  try {
    const { bookingId } = req.params

    const conversation = await Conversation.findOne({ bookingId })

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    const isParticipant = [
      conversation.hostId.toString(),
      conversation.renterId.toString(),
    ].includes(req.user.id)
    if (!isParticipant) {
      return res
        .status(403)
        .json({ message: 'Not authorized to view messages' })
    }

    res.status(200).json(conversation.messages)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch messages', error: err.message })
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const { bookingId, text } = req.body

    const conversation = await Conversation.findOne({ bookingId })

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    const isParticipant = [
      conversation.hostId.toString(),
      conversation.renterId.toString(),
    ].includes(req.user.id)
    if (!isParticipant) {
      return res
        .status(403)
        .json({ message: 'Not authorized to send messages' })
    }

    const message = {
      senderId: req.user.id,
      text,
      timestamp: new Date(),
    }

    conversation.messages.push(message)
    await conversation.save()

    res.status(201).json(message)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to send message', error: err.message })
  }
}

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id

    const conversations = await Conversation.find({
      $or: [{ hostId: userId }, { renterId: userId }],
    })
      .populate({
        path: 'bookingId',
        populate: {
          path: 'homestay',
          select: 'title images location',
        },
      })
      .sort({ updatedAt: -1 })

    res.status(200).json(conversations)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to load conversations', error: err.message })
  }
}
