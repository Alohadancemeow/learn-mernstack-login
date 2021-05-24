const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// User Model
const User = require('../../models/User')

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    // Check for existing user
    User.findOne({ email }) // yes = true / no = false
        .then((user) => {

            // user = true(fasle) / user = false(true)
            if (!user) return res.status(400).json({ message: 'User does not exists' })

            // Validate || Compare password
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

                    // Create token
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 }, // 3600sec = 60 min.
                        (err, token) => {
                            if (err) throw err

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })

        })
})

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user))
})


module.exports = router