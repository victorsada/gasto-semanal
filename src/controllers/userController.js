const createError = require('http-errors');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = new User(req.body);
    //hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(req.body.password, salt);
    //save user
    await user.save();

    // payload del jwt
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
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users.length) {
      throw createError('No hay usuarios');
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw createError(404, 'El usuario no existe');
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw createError(404, 'El usuario no existe');
    }
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send({
      message: `El usuario ${user.email} ha sido eliminado exitosamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { nombre, password, ingreso, saldo } = req.body;
  try {
    if (!nombre && !password && !ingreso && !saldo) {
      throw createError(
        400,
        'Debe editar al menos un campo: nombre, password, ingreso o saldo'
      );
    }
    if (password) {
      //hash password
      const salt = await bcryptjs.genSalt(10);
      req.body.password = await bcryptjs.hash(password, salt);
    }
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw createError(404, 'El usuario no existe');
    }

    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send({
      mensaje: `El usuario ${user.nombre} ha sido actualizado exitosamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};
