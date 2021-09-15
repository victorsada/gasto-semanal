const express = require('express');
const User = require('../models/User');
const createError = require('http-errors');

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
