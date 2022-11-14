class NotImplementedWxception extends Error {
  constructor() {
    super("Not implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedWxception();
  }
  read(query) {
    throw new NotImplementedWxception();
  }
  update(id, item) {
    throw new NotImplementedWxception();
  }
  delete(id) {
    throw new NotImplementedWxception();
  }
}

class MongoDB extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("O item foi salvo em MongoDB");
  }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log("O item foi salvo em Postgress");
  }
}

class ContextStrategy {
  constructor(strategy) {
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
}

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
