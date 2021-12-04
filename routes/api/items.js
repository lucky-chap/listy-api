const express = require('express');
const { getAllItems, createItem, updateItem, deleteItem } = require('../../controllers/itemsController');
const auth = require('../../middleware/auth');
const router = express.Router();


// @route  GET api/items
// @desc   Get All Items Of The Authenticated User
// @access Private
router.get('/', getAllItems);

// @route  POST api/items
// @desc   Create an Item
// @access Private
router.post('/', auth, createItem);

// @route PATCH api/items/:id
// @desc Update an item
// @access Private
router.patch('/:id', auth, updateItem);

// @route  DELETE api/items/:id
// @desc   Delete an Item
// @access Private
router.delete('/:id', auth, deleteItem)

module.exports = router;