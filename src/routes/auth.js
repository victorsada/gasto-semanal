const express = require('express');
const { getAuth, login } = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// @route   GET api/auth
// @desc    Get user by JWT
// @access  Public
router.get('/', auth, getAuth);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
