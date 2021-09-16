const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req, res, next) => {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await User.findByPk(decoded.user.id);
    next();
  } catch (err) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
module.exports = auth;
