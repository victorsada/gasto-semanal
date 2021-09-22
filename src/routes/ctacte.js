const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const { createCtaCte } = require('../controllers/ctacteController');

router.post(
  '/',
  auth,
  [
    check('acredor', 'debe haber un acredor').not().isEmpty(),
    check('deudor', 'debe haber un deudor').not().isEmpty(),
    check('saldo', 'debe ingresar un saldo, numerico')
      .not()
      .isEmpty()
      .isFloat(),
  ],
  createCtaCte
);

module.exports = router;
