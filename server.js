const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const path = require('path')


const initDB = require('./config/db')

dotenv.config();

initDB()

const app = express()

// Bodyparser Middleware
app.use(express.json())

// Use Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/items', require('./routes/api/items'));

// set static folder
app.use(express.static('client/build'))

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
	console.log(
		`Server runnuing in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`.yellow
			.bold
	)
)
