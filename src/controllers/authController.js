const User = require('../models/User');
const createError = require('http-errors');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Get user by JWT
// @access  Public
module.exports.getAuth = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      throw createError(404, 'No hay usuario logeado.');
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(err.status).send(err);
  }
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    // check email
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // check password
    const passCheck = await bcryptjs.compare(password, user.password);
    if (!passCheck) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // Return jswonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    await jwt.sign(
      payload,
      process.env.JWT,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
