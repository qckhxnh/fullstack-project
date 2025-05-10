const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { name, email, password, location } = req.body
    const profilePic = req.file ? req.file.filename : req.body.profilePic || ''

    const existing = await User.findOne({ email })
    if (existing)
      return res.status(400).json({ message: 'Email already in use' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,

      profilePic,
      location,
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.status(200).json({ token, user: { id: user._id, name: user.name } })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}
