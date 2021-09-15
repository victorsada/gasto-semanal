const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
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
  auth,
  [
    check('descripcion', 'Descripcion es obligatoria').not().isEmpty(),
    check('importe', 'Importe es obligatorio').not().isEmpty(),
  ],
  createGasto
);
router.get('/', auth, getGastos);
router.get('/:id', auth, getGasto);
router.put('/:id', auth, updateGasto);
router.delete('/:id', auth, deleteGasto);

module.exports = router;
