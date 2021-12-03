const express = require('express');
const { authenticateUser, getAuthUser } = require('../../controllers/authController');

const auth = require('../../middleware/auth');

const router = express.Router()

// @route  POST api/auth
// @desc   Authenticate the user
// @access Public
router.post('/', authenticateUser)

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, getAuthUser);


module.exports = router;