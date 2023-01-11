const sequelize = require("sequelize");
const UsuarioSchema = {
  name: "usuarios",
  schema: {
    id: {
      type: sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: sequelize.STRING,
      unique:true,
      required: true,
    },
    password: {
      type: sequelize.STRING,
      required: true,
    },
  },
  options: {
    tableName: "TB_USUARIOS",
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = UsuarioSchema;
