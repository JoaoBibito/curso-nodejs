const ICrud = require("./interfaces/InterfaceCrud");
class MongoDB extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("O item foi salvo em MongoDB");
  }
}

module.exports = MongoDB;
