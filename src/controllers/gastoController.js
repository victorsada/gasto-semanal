const { validationResult } = require('express-validator');
const createError = require('http-errors');
const Gasto = require('../models/Gasto');

// @route   POST api/gasto
// @desc    Create or *update* gasto
// @access  Private
module.exports.createGasto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gasto = new Gasto(req.body);
    gasto.UserId = req.user.id;
    await gasto.save();
    res.status(200).send(gasto);
  } catch (err) {
    console.error(err.message);
    res.status(error.status).send(error);
  }
};

module.exports.getGastos = async (req, res) => {
  try {
    const gastos = await Gasto.findAll();
    if (!gastos.length) {
      throw createError(404, 'No hay gastos');
    }
    res.status(200).send(gastos);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.getGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      throw createError(404, 'El gasto no existe');
    }
    res.status(200).send(gasto);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.updateGasto = async (req, res) => {
  const { descripcion, importe, tipo, pagado } = req.body;
  try {
    //validamos que haya al menos un campo para editar
    if (!descripcion && !importe && !tipo && !pagado) {
      throw createError(
        400,
        'Debes editar al menos un campo: descripcion, importe, tipo o pagado'
      );
    }
    //validamos que exista el gasto a editar
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      throw createError(404, 'El Gasto no existe');
    }
    //Actualizamos el Gasto
    await Gasto.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      mensaje: `El Gasto '${gasto.descripcion}' ha sido actualizado exitosamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};

module.exports.deleteGasto = async (req, res) => {
  try {
    const gasto = await Gasto.findByPk(req.params.id);
    if (!gasto) {
      throw createError(404, 'El gasto no existe');
    }
    await Gasto.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send({
      message: `El gasto '${gasto.descripcion}' ha sido eliminado exitosamente`,
    });
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};
