const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const auth = require('../middleware/authMiddleware')
const {
  createHomestay,
  getAllHomestays,
} = require('../controllers/homestayController')

router.post('/', auth, upload.array('images', 5), createHomestay)
router.get('/', getAllHomestays)

module.exports = router
