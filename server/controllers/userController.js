const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User');

const registerUser = async (req, res) => {
	const { name, email, password } = req.body

	// check for all form fields
	if (!name || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' })
	}

	// Check for existing user
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ msg: 'User already exists' })

		const newUser = new User({
			name,
			email,
			password,
		})

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err
				newUser.password = hash
				newUser.save().then(user => {
					jwt.sign(
						{
							id: user.id,
						},
						process.env.JWT_SECRET,
						{ expiresIn: '24h' },
						(err, token) => {
							if (err) throw err

							res.json({
								token,
								user: {
									id: user.id,
									name: user.name,
									email: user.email,
								},
							})
						}
					)
				})
			})
		})
	})
}




module.exports = {
    registerUser,
}