const Sequelize = require("sequelize"); //la libreria
const sequelize = require("../config/database"); //la conexion

const User = sequelize.define(
  "User",
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
    timestamps: false,
  }
);

User.sync()
  .then(() => {
    console.log("Tabla actualizada");
  })
  .catch((err) => console.log(err));

module.exports = User;
