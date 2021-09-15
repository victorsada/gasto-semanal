const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

router.post(
  '/',
  [
    check('nombre', 'nombre es obligatorio').not().isEmpty(),
    check('email', 'email es obligatorio').not().isEmpty(),
    check('password', 'password es obligatorio').not().isEmpty(),
    check('email', 'El formato debe ser xxx@xxx.com').isEmail(),
  ],
  createUser
);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put(
  '/:id',
  [check('email', 'El email no se puede editar').isEmpty()],
  updateUser
);

module.exports = router;
