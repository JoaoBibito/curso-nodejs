const BaseRoutes = require("./base/baseRoutes");
class HeroRoutes extends BaseRoutes {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: "/herois",
      method: "GET",
      handler: (request, headers) => {
        try {
          const {skip, limit, nome} = request.query;
          let query = {};
          if (nome) {
            query.nome = nome;
          }
          if (isNaN(skip)) {
            throw Error("O tipo de skip é incorreto");
          }
          if (isNaN(limit)) {
            throw Error("O tipo de limit é incorreto");
          }
          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          console.log("Deu ruin", error);
          return "Erro interno no servidor";
        }
      },
    };
  }
  create() {
    return {
      path: "/herois",
      method: "POST",
      handler: (request, headers) => {
        return this.db.read();
      },
    };
  }
}

module.exports = HeroRoutes;
