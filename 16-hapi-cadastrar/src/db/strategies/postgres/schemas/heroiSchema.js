const sequelize = require("sequelize");
const HeroiSchema = {
  name: "heroes",
  schema: {
    id: {
      type: sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: sequelize.STRING,
      required: true,
    },
    poder: {
      type: sequelize.STRING,
      required: true,
    },
  },
  options: {
    tableName: "TB_HEROIS",
    freezeTableName: false,
    timestamps: false,
  },
};

module.exports = HeroiSchema;
