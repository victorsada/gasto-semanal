const createError = require('http-errors');
const { validationResult } = require('express-validator');
const Ctacte = require('../models/CtaCte');
const User = require('../models/User');

module.exports.getDeudas = async (req, res) => {
  try {
    const deudas = await Ctacte.findAll();
    if (!deudas.length) {
      throw createError(404, 'No hay deudas');
    }
    res.status(200).send({ deudas });
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.createDeuda = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // obtenemos el deudor y chequeamos que existe
    const deudor = await User.findOne({
      where: {
        email: req.body.deudor,
      },
    });
    if (!deudor) {
      throw createError(404, `El deudor '${req.body.deudor}' no existe`);
    }

    // obtenemos el acreedor y chequeamos que existe
    const acreedor = await User.findOne({
      where: {
        email: req.body.acreedor,
      },
    });
    if (!acreedor) {
      throw createError(404, `El acreedor '${req.body.acreedor}' no existe`);
    }

    const deuda = new Ctacte(req.body);
    await deuda.save();
    res.status(201).send(deuda);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.deleteDeuda = async (req, res) => {
  try {
    const ctacte = await Ctacte.findByPk(req.params.id);
    if (!ctacte) {
      throw createError(404, 'La Deuda no existe');
    }
    await Ctacte.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send({
      message: `La deuda '${ctacte.nombreCtacte}' ha sido eliminada exitosamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};
