const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
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
    check('saldo', 'El saldo es obligatorio').not().isEmpty(),
  ],
  createUser
);
router.get('/', auth, getUsers);
router.get('/:id', auth, getUser);
router.delete('/:id', auth, deleteUser);
router.put(
  '/:id',
  auth,
  [check('email', 'El email no se puede editar').isEmpty()],
  updateUser
);

module.exports = router;
