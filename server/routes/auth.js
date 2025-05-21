const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')
const verifyToken = require('../middleware/authMiddleware')

router.post(
  '/register',
  require('../middleware/upload').single('profilePic'),
  register
)
router.post('/login', login)

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Protected route access granted',
    user: req.user,
  })
})

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await require('../models/User')
      .findById(req.user.id)
      .select('-password')
    res.status(200).json(user)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch profile', error: err.message })
  }
})

module.exports = router
