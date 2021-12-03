const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Route for loggin in the user
const authenticateUser = async (req, res) => {
	const { email, password } = req.body

	// check for all form fields
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' })
	}

	// Check for existing user
	await User.findOne({ email }).then(user => {
		if (!user) return res.status(400).json({ msg: 'User does not exist' })

		// Validate password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch)
				return res.status(400).json({
					msg: 'Invalid credentials',
				})

			jwt.sign(
				{
					id: user.id,
				},
				process.env.JWT_SECRET,
				{ expiresIn: '48h' },
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
}




// Route for getting the authenticated user
const getAuthUser = async (req, res) => {
	await User.findById(req.user.id)
		.select('-password')
		.then(user => {
			res.json(user)
		})
}


module.exports = {
    authenticateUser,
    getAuthUser,
}