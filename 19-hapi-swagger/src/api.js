const Hapi = require("hapi");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const Context = require("./db/strategies/base/contextStrategy");
const HeroiSchema = require("./db/strategies/mongodb/schemas/heroisSchema");
const HeroRoutes = require("./routes/heroRoutes");
const HapiSwagger = require("hapi-swagger")
const Vision= require("vision")
const Inert = require("inert")


const app = new Hapi.Server({
  port: 5000,
});

function mapRoutes(instance, methods) {
  console.log("Metodos", methods);
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroiSchema));
  const swaggerOptions={
    info:{
      title:"API Herois - #CursoNodeBR",
      version:'v1.0'
    },
    lang:"pt"
  }
  await app.register([
    Vision,
    Inert,
    {
      plugin:HapiSwagger,
      options:swaggerOptions
    }
  ]) 

  app.route(
    mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
    );
  await app.start();
  console.log("Servidor rodando na porta ", app.info.port);

  return app;
}

module.exports = main();
