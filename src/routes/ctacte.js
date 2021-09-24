const express = require('express');
const { check } = require('express-validator');
const {
  getDeudas,
  createDeuda,
  deleteDeuda,
} = require('../controllers/ctacteController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getDeudas);
router.post(
  '/',
  [
    check('nombreCtacte', 'el campo nombreCtacte es obligatorio')
      .not()
      .isEmpty(),
    check('deudor', 'el DEUDOR es obligatorio').not().isEmpty(),
    check('acreedor', 'el ACREEDOR es obligatorio').not().isEmpty(),
    check('monto', ' el MONTO es obligatorio').not().isEmpty(),
  ],
  auth,
  createDeuda
);
router.delete('/:id', auth, deleteDeuda);

module.exports = router;
