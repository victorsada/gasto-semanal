const Sequelize = require('sequelize'); // la libreria
const sequelize = require('../config/database'); // la conexion

const Ctacte = sequelize.define(
  'Ctacte',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    nombreCtacte: {
      type: Sequelize.STRING,
    },
    deudor: {
      type: Sequelize.STRING,
    },
    acreedor: {
      type: Sequelize.STRING,
    },
    monto: {
      type: Sequelize.FLOAT,
    },
    saldado: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Ctacte.sync({ alter: true })
  .then(() => {
    console.log('Tabla CUENTAS CORRIENTES sincronizada');
  })
  .catch((err) => console.log(err));

module.exports = Ctacte;
