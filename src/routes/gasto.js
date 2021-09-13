const express = require('express');
const router = express.Router();
const { gastoTest } = require('../controllers/gastoController');

router.get('/', gastoTest);

module.exports = router;
