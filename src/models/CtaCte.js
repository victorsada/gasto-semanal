const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Gasto = require('./Gasto');

const CtaCte = sequelize.define(
  'CtaCte',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    acredor: {
      type: Sequelize.UUID,
    },
    deudor: {
      type: Sequelize.UUID,
    },
    saldo: {
      type: Sequelize.FLOAT,
    },
    observacion: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

CtaCte.sync({ alter: true })
  .then(() => {
    console.log('Tabla CTACTE sincronizada');
  })
  .catch((err) => console.log(err));

module.exports = CtaCte;
