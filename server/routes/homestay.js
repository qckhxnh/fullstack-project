const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const auth = require('../middleware/authMiddleware')
const {
  getAllHomestays,
  createHomestay,
  getHomestayById,
  updateHomestay,
  deleteHomestay,
} = require('../controllers/homestayController')

router.post('/', auth, upload.array('images', 5), createHomestay)
router.get('/', getAllHomestays)
router.get('/:id', auth, getHomestayById)
router.put('/:id', auth, upload.array('images', 5), updateHomestay)
router.delete('/:id', auth, deleteHomestay)

module.exports = router
