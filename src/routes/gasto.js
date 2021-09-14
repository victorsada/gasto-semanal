const express = require('express');
const router = express.Router();
const {
  createGasto,
  getGastos,
  getGasto,
  updateGasto,
  deleteGasto,
} = require('../controllers/gastoController');
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
router.get('/', getGastos);
router.get('/:id', getGasto);
router.put('/:id', updateGasto);
router.delete('/:id', deleteGasto);

module.exports = router;
