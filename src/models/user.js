const Sequelize = require('sequelize'); //la libreria
const sequelize = require('../config/database'); //la conexion
const Gasto = require('./Gasto');

const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    ingreso: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Gasto, { foreingKey: 'email', sourceKey: 'id' });
Gasto.belongsTo(User, { foreingKey: 'email', sourceKey: 'id' });

User.sync()
  .then(() => {
    console.log('Tabla actualizada');
  })
  .catch((err) => console.log(err));

module.exports = User;
