// npm install sequelize
const sequelize = require("sequelize");
const driver = new sequelize("heroes", "joaobibito", "79878559", {
  host: "localhost",
  dialect: "postgres",
  quoteIdentifiers: false,
  operatorsAliases: false,
});

async function main() {
  const herois = driver.define(
    "heroes",
    {
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
    {
      tableName: "TB_HEROIS",
      freezeTableName: false,
      timestamps: false,
    },
  );
  await herois.sync();
  // await herois.create({
  //   nome: "Lanterna Verde",
  //   poder: "Anel",
  // });
  const result = await herois.findAll({
    raw: true,
    attributes: ["nome", "poder"],
  });
  console.log("Result0", result);
}

main();
