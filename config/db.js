const mongoose = require('mongoose')

// db config
MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/listy'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log(
			`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
		)
	} catch (err) {
		console.log(`Error: ${err.message}`.red)
		process.exit(1)
	}
}

module.exports = connectDB
