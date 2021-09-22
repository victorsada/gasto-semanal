const Sequelize = require('sequelize'); //la libreria
const sequelize = require('../config/database'); //la conexion

const Gasto = sequelize.define(
  'Gasto',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
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
    pagado: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    UserId: {
      type: Sequelize.UUID,
    },
    ctacte: {
      type: Sequelize.UUID,
    },
    observacion: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Gasto.sync({ alter: true })
  .then(() => {
    console.log('Tabla GASTO sincronizada');
  })
  .catch((err) => console.log(err));

module.exports = Gasto;
