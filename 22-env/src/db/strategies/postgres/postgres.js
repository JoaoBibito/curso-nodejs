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
    const SSL_DB = process.env.SSL_DB === 'true' ? true : undefined
    const SSL_DB_REJECT = process.env.SSL_DB_REJECT === 'false' ? false : undefined
    
    let dialectOptions = {}
    if (SSL_DB) {
        dialectOptions = {
            ssl: {
                require: SSL_DB,
                rejectUnauthorized: SSL_DB_REJECT,
            }
        };
    };

    const connection = new sequelize(process.env.POSTGRES_URL, {
        quoteIdentifiers: false,
        logging: false,
        dialectOptions,
    });
    
    return connection;
    // const connection = new sequelize(process.env.POSTGRES_URL, {
    //   quoteIdentifiers: false,
    //   operatorsAliases: false,
    //   logging: false,
    //   ssl:process.env.SSL_DB,
    //   dialectOptions:{
    //     ssl:process.env.SSL_DB
    //   }
    // });
    // return connection;
  }
}
module.exports = Postgres;
