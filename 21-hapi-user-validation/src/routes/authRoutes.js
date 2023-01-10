const Joi = require("joi");
const Boom = require("boom")
const BaseRoutes = require("./base/baseRoutes");
const Jwt= require("jsonwebtoken")
const failAction = (request, headers, erro) => {
  throw erro;
};

const USER = {
  username:"Jhon Doe",
  password:"123"
}

class AuthRoutes extends BaseRoutes{
  constructor(key){
    super()
    this.secret =key
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

        if(username.toLowerCase()!==USER.username.toLowerCase()|| password!==USER.password){
          return  Boom.unauthorized()
        }
        const token = Jwt.sign({
          username:username,
          id:1
        },this.secret)
        return {
          token:token
        }
      }
    }
  }
}
module.exports = AuthRoutes;