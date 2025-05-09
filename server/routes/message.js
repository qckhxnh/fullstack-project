const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  sendMessage,
  getConversation,
} = require('../controllers/messageController')

router.post('/', auth, sendMessage)
router.get('/:userId', auth, getConversation)

module.exports = router
