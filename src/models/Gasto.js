const Sequelize = require('sequelize'); //la libreria
const sequelize = require('../config/database'); //la conexion

const Gasto = sequelize.define(
  'Gasto',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    importe: {
      type: Sequelize.FLOAT,
    },
    tipo: {
      type: Sequelize.STRING,
    },
    UserId: {
      type: Sequelize.FLOAT,
    },
  },
  {
    timestamps: true,
  }
);

Gasto.sync()
  .then(() => {
    console.log('Tabla actualizada');
  })
  .catch((err) => console.log(err));

module.exports = Gasto;
