const Joi = require("joi");
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
      config: {
        validate: {
          //payload -> body
          //headers -> header
          //params -> url:id
          //query -> ?skip=0&limit=100
          failAction: (request, headers, erro) => {
            throw erro;
          },
          query: {
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(100),
            nome: Joi.string().min(3).max(100),
          },
        },
      },
      handler: (request, headers) => {
        try {
          const {skip, limit, nome} = request.query;
          const query = nome
            ? {
                nome: {$regex: `.*${nome}*.`},
              }
            : {};
          return this.db.read(nome ? query : {}, skip, limit);
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
