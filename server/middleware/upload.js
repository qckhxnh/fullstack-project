const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname
    cb(null, uniqueName)
  },
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (!['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
      return cb(new Error('Only images are allowed'), false)
    }
    cb(null, true)
  },
})

module.exports = upload
