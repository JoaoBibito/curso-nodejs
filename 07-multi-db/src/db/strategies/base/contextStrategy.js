const ICrud = require("./../interfaces/InterfaceCrud");

class ContextStrategy extends ICrud {
  constructor(strategy) {
    super();
    this._database = strategy;
  }
  create(item) {
    return this._database.create(item);
  }
  read(item) {
    return this._database.read(item);
  }
  updade(id, item) {
    return this._database.updade(id, item);
  }
  delete(id) {
    return this._database.delete(id, item);
  }
  isConnected() {
    return this._database.isConnected();
  }
}

module.exports = ContextStrategy;
