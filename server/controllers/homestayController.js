const Homestay = require('../models/Homestay')

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
