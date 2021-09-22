const { validationResult } = require('express-validator');
const CtaCte = require('../models/CtaCte');

module.exports.createCtaCte = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const ctacte = new CtaCte(req.body);
    await ctacte.save();
    res.status(200).send(ctacte);
  } catch (error) {
    console.log(error);
    res.status(error.status).send(error);
  }
};
