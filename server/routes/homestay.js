const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const auth = require('../middleware/authMiddleware')
const roleCheck = require('../middleware/roleCheck') // 👈 NEW
const {
  createHomestay,
  getAllHomestays,
  getHomestayById,
  updateHomestay,
  deleteHomestay,
  getMyListings,
} = require('../controllers/homestayController')

// 👇 Host only
router.post(
  '/',
  auth,
  roleCheck('host'),
  upload.array('images', 5),
  createHomestay
)

router.put(
  '/:id',
  auth,
  roleCheck('host'),
  upload.array('images', 5),
  updateHomestay
)
router.delete('/:id', auth, roleCheck('host'), deleteHomestay)

router.get('/', getAllHomestays)
router.get('/:id', getHomestayById)
router.get('/my', auth, getMyListings)

module.exports = router
