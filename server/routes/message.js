const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  getMessages,
  sendMessage,
  getConversations,
} = require('../controllers/messageController')

router.get('/', auth, getConversations)
router.get('/:bookingId', auth, getMessages)
router.post('/', auth, sendMessage)

module.exports = router
