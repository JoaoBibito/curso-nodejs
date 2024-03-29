const ICrud = require("../interfaces/InterfaceCrud");
const sequelize = require("sequelize");

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    (this._connection = connection), (this._schema = schema);
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log("Fail !", error);
      return false;
    }
  }
  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }
  async create(item) {
    const {dataValues} = await this._schema.create(item, {raw: true});
    return dataValues;
  }
  async update(id, item,upsert=false) {
    const fn = upsert?'upsert':'update'
    return this._schema[fn](item, {where: {id: id}});
  }
  async delete(id) {
    const query = id ? {id} : {};
    return this._schema.destroy({where: query});
  }
  async read(item = {}) {
    return this._schema.findAll({where: item, raw: true});
  }
  static async connect() {
    const connection = new sequelize("heroes", "joaobibito", "79878559", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorsAliases: false,
      logging: false,
    });
    return connection;
  }
}
module.exports = Postgres;
