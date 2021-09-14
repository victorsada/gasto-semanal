const express = require('express');
const router = express.Router();
const { createGasto } = require('../controllers/gastoController');
const { check } = require('express-validator');

// @route   POST api/gasto
// @desc    Create or *update* gasto
// @access  Private
router.post(
  '/',
  [
    check('descripcion', 'Descripcion es obligatoria').not().isEmpty(),
    check('importe', 'Importe es obligatorio').not().isEmpty(),
  ],
  createGasto
);

module.exports = router;
