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
    saldo: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Gasto, { foreignKey: 'UserId', sourceKey: 'id' });
Gasto.belongsTo(User, { foreignKey: 'UserId', sourceKey: 'id' });

User.sync()
  .then(() => {
    console.log('Tabla actualizada');
  })
  .catch((err) => console.log(err));

module.exports = User;
