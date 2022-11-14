const ICrud = require("./interfaces/InterfaceCrud");
class Postgres extends ICrud {
  constructor() {
    super();
  }
  isConnected() {}

  create(item) {
    console.log("O item foi salvo em Postgress");
  }
}
module.exports = Postgres;
