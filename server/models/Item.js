const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Schema
const ItemSchema = Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	isChecked: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Item = mongoose.model('Item', ItemSchema)
