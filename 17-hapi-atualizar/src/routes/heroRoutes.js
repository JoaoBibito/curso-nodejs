const Joi = require("joi");
const BaseRoutes = require("./base/baseRoutes");
const failAction = (request, headers, erro) => {
  throw erro;
};

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
          failAction,
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
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(3).max(100),
          },
        },
      },
      handler: async (request) => {
        try {
          const {nome, poder} = request.payload;
          const result = await this.db.create({nome, poder});
          return {
            message: "Heroi cadastrado com sucesso!",
            _id: result._id,
          };
        } catch (erro) {
          console.log("Erro: ", erro);
          return "internal Error";
        }
      },
    };
  }
  
  update(){
    return {
      path:"/herois/{id}",
      method:"PATCH",
      config:{
        validate:{
          params:{
            id:Joi.string().required()
          },
          payload:{
            nome:Joi.string().min(3).max(100),
            poder:Joi.string().min(2).max(100)
          }
        }
      },
      handler: async (request)=>{
        try{
          const {id}= request.params
          const {payload}= request
          const dadosString=JSON.stringify(payload)
          const dados = JSON.parse(dadosString)
          const result =  await this.db.update(id,dados)
          if(result.modifiedCount!== 1)return{
            message:"Não foi possível atualizar!"
          }
          return {message:"Heroi atualizado com sucesso!"}
        }
        catch(error){
          console.log("Deu ruin!", error)
          return "Erro interno"
        }
      }
    }
  }
}

module.exports = HeroRoutes;
