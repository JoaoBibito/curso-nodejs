const Joi = require("joi");
const Boom = require("boom")
const BaseRoutes = require("./base/baseRoutes");
const Jwt= require("jsonwebtoken")
const PasswordHelper=require("../helpers/passwordhelper")
const failAction = (request, headers, erro) => {
  throw erro;
};

const USER = {
  username:"Jhon Doe",
  password:"123"
}

class AuthRoutes extends BaseRoutes{
  constructor(key,db){
    super()
    this.secret =key
    this.db = db
  }
  login(){
    return{
      path:"/login",
      method:"POST",
      config:{
        auth:false,
        tags:["api"],
        description:"Obter token",
        notes:"Faz login com user e senha do banco ",
        validate:{
          failAction,
          payload:{
            username:Joi.string().required(),
            password:Joi.string().required()
          },
        },
      },
      handler:async(request)=>{
        const {username,password}=request.payload
        const [usuario]= await this.db.read({
          username: username.toLowerCase()
        })
        if(!usuario){
          return Boom.unauthorized('O usuário informado não existe!') 
        }
        const match = await PasswordHelper.comparePassword(password,usuario.password)
        if(!match){
          return Boom.unauthorized("O usuário ou senha inválidos!")
        }
        const token = Jwt.sign({
          username:username,
          id:usuario.id
        },this.secret)
        return {
          token:token
        }
      }
    }
  }
}
module.exports = AuthRoutes;