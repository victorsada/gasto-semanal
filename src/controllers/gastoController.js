const express = require('express');
const { validationResult } = require('express-validator');
const Gasto = require('../models/Gasto');

// @route   POST api/gasto
// @desc    Create or *update* gasto
// @access  Private
module.exports.createGasto = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, descripcion, importe, tipo, estado, UserId } = req.body;

  try {
    const gasto = await Gasto.findOrCreate({
      where: { id: '1234' },
      defaults: {
        descripcion: descripcion,
        importe: importe,
        tipo: tipo,
        estado: estado,
      },
    });
    res.status(200).send(gasto);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
