const Sequelize = require('sequelize'); //la libreria
const sequelize = require('../config/database'); //la conexion
const Gasto = require('./Gasto');
const CtaCte = require('./CtaCte');

const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    nombre: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
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
    timestamps: true,
  }
);

User.hasMany(CtaCte, { foreignKey: 'acredor', sourceKey: 'id' });
CtaCte.belongsTo(User, { foreignKey: 'acredor', sourceKey: 'id' });

User.hasMany(Gasto, { foreignKey: 'UserId', sourceKey: 'id' });
Gasto.belongsTo(User, { foreignKey: 'UserId', sourceKey: 'id' });

User.sync({ alter: true })
  .then(() => {
    console.log('Tabla USER sincronizada');
  })
  .catch((err) => console.log(err));

module.exports = User;
