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
  getMyHomestays,
} = require('../controllers/homestayController')

router.post('/', auth, upload.array('images', 5), createHomestay)

router.put(
  '/:id',
  auth,
  roleCheck('host'),
  upload.array('images', 5),
  updateHomestay
)
router.delete('/:id', auth, deleteHomestay)

router.get('/', getAllHomestays)
router.get('/my', auth, getMyHomestays)
router.get('/:id', getHomestayById)

module.exports = router
