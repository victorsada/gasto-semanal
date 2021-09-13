const createError = require('http-errors');
const User = require('../models/User');
const bgitcryptjs = require('bcryptjs');

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

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};
