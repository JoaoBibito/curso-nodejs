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
  isConnected() {
    throw new NotImplementedWxception();
  }
}

module.exports = ICrud;
