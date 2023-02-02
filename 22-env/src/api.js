const {config} = require("dotenv")
const {join }=require("path")
const {ok}=require("assert")

const env = process.env.NODE_ENV||"dev"
ok(env==="prod"|| env==="dev", "A env é inválida, ou dev ou prod ")

const configPath=join(__dirname,"../config",`.env.${env}`)
config({
  path:configPath
})

console.log("Mngoooo", process.env.MONGODB_URL)

const Hapi = require("hapi");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const Context = require("./db/strategies/base/contextStrategy");
const HeroiSchema = require("./db/strategies/mongodb/schemas/heroisSchema");
const HeroRoutes = require("./routes/heroRoutes");
const AuthRoutes = require("./routes/authRoutes");
const Postgres = require("./db/strategies/postgres/postgres")
const usuarioSchema=require("./db/strategies/postgres/schemas/usuarioSchema")
const HapiJwt = require("hapi-auth-jwt2")
const HapiSwagger = require("hapi-swagger")
const Vision= require("vision")
const Inert = require("inert");
const UsuarioSchema = require("./db/strategies/postgres/schemas/usuarioSchema");
const JWT_SECRET = process.env.JWT_SECRET;

const app = new Hapi.Server({
  port: process.env.PORT,
});

function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, HeroiSchema));
  const connectionpostgres = await Postgres.connect()
  const model = await Postgres.defineModel(connectionpostgres,UsuarioSchema)
  const contextPostgres = new Context(new Postgres(connectionpostgres,model))

  const swaggerOptions={
    info:{
      title:"API Herois - #CursoNodeBR",
      version:'v1.0'
    },
    lang:"pt"
  }
  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin:HapiSwagger,
      options:swaggerOptions
    }
  ]) 
app.auth.strategy('jwt','jwt',{
  key:JWT_SECRET,
  // options:{
  //   expireIn:20
  // }
  validate:async (dado,request)=>{
    const [result] = await contextPostgres.read({
      username:dado.username.toLowerCase(),
      id:dado.id
    })
    if(!result){
      return{
        isValid:false
      }
    }
    //verifica no banco se usuario esta ativo
    //verifica no banco se usuario continua pagando
    return{
      isValid:true
    }
  }
})
app.auth.default("jwt")
  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
    ...mapRoutes(new AuthRoutes(JWT_SECRET,contextPostgres), AuthRoutes.methods())
  ]);
  await app.start();
  console.log("Servidor rodando na porta ", app.info.port);

  return app;
}

module.exports = main();
