const express = require('express');
const { registerUser } = require('../../controllers/userController');
const router = express.Router();

// @route  POST api/users
// @desc   Register new user
// @access Public
router.post('/', registerUser);







module.exports = router;