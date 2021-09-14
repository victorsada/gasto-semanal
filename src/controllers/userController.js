const createError = require('http-errors');
const User = require('../models/User');
const bgitcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.createUser = async (req, res) => {
  const { nombre, email, password, ingreso } = req.body;
  try {
    if (!nombre || !email || !password || !ingreso) {
      throw createError(
        400,
        'NOMBRE, EMAIL, PASSWORD, and INGRESO are required'
      );
    }
    const user = new User(req.body);
    //hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    //save user
    await user.save();

    // payload del jwt
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); //res.status(200).send(user).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};
