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

module.exports = router
