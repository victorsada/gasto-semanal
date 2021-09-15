const express = require('express');
const { getAuth } = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Get user by JWT
// @access  Public
router.get('/', auth, getAuth);

module.exports = router;
