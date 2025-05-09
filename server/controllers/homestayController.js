const Homestay = require('../models/Homestay')
const Booking = require('../models/Booking')
const Message = require('../models/Message')
// test git again
// CREATE
exports.createHomestay = async (req, res) => {
  try {
    const { title, location, description, price, availability, imageUrls } =
      req.body

    const uploadedImages = req.files
      ? req.files.map((file) => file.filename)
      : []
    const parsedUrls = Array.isArray(imageUrls)
      ? imageUrls
      : imageUrls
      ? JSON.parse(imageUrls)
      : []

    const allImages = [...uploadedImages, ...parsedUrls]

    const parsedAvailability = Array.isArray(availability)
      ? availability
      : JSON.parse(availability)

    const homestay = await Homestay.create({
      title,
      location,
      description,
      price,
      images: allImages,
      availability: parsedAvailability,
      owner: req.user.id,
    })

    res.status(201).json(homestay)
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create homestay',
      error: err.message,
    })
  }
}

// GET ALL
exports.getAllHomestays = async (req, res) => {
  try {
    const homes = await Homestay.find().populate(
      'owner',
      'name location profilePic'
    )
    res.status(200).json(homes)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching homestays', error: err.message })
  }
}

// GET BY ID
exports.getHomestayById = async (req, res) => {
  try {
    const home = await Homestay.findById(req.params.id).populate(
      'owner',
      'name location profilePic'
    )
    if (!home) return res.status(404).json({ message: 'Homestay not found' })
    res.status(200).json(home)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to fetch homestay', error: err.message })
  }
}

// UPDATE
exports.updateHomestay = async (req, res) => {
  try {
    const { title, location, description, price, availability, imageUrls } =
      req.body

    const homestay = await Homestay.findById(req.params.id)
    if (!homestay)
      return res.status(404).json({ message: 'Homestay not found' })

    if (homestay.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'You are not the owner of this homestay' })
    }

    const uploadedImages = req.files
      ? req.files.map((file) => file.filename)
      : []
    const parsedUrls = Array.isArray(imageUrls)
      ? imageUrls
      : imageUrls
      ? JSON.parse(imageUrls)
      : []
    const allImages = [...uploadedImages, ...parsedUrls]

    homestay.title = title || homestay.title
    homestay.location = location || homestay.location
    homestay.description = description || homestay.description
    homestay.price = price || homestay.price
    homestay.images = allImages.length ? allImages : homestay.images
    homestay.availability = Array.isArray(availability)
      ? availability
      : availability
      ? JSON.parse(availability)
      : homestay.availability

    await homestay.save()
    res.status(200).json(homestay)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to update homestay', error: err.message })
  }
}

// DELETE
exports.deleteHomestay = async (req, res) => {
  try {
    const homestay = await Homestay.findById(req.params.id)
    if (!homestay)
      return res.status(404).json({ message: 'Homestay not found' })

    if (homestay.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'You are not the owner of this homestay' })
    }

    const bookingIds = await Booking.find({ homestay: homestay._id }).distinct(
      '_id'
    )

    await Booking.deleteMany({ homestay: homestay._id })
    await Message.deleteMany({ booking: { $in: bookingIds } })
    await homestay.deleteOne()

    res.status(200).json({ message: 'Homestay deleted successfully' })
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to delete homestay', error: err.message })
  }
}
