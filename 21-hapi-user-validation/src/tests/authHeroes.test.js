const assert = require("assert")
const api = require("../api")
const Context = require("../db/strategies/base/contextStrategy")
const Postgres = require("../db/strategies/postgres/postgres")
const PostGres=require("../db/strategies/postgres/postgres")
const UsuarioSchema = require("../db/strategies/postgres/schemas/usuarioSchema")
let app = {}
const USER={
  username:"Jhon Doe",
  password:'123'
}

const USER_DB={
  username:USER.username.toLowerCase(),
  password:'$2b$04$SK9cZoIMslxirUfIYGOJuOJnAxQTG0Q4Izygjf/BxZzFCB2ei/1nW'
}
describe("Auth test suite", function (){
  this.beforeAll(async ()=>{
    app=await api
    const connectionPostgres =await PostGres.connect()
    const model = await PostGres.defineModel(connectionPostgres,UsuarioSchema)
    postgres = new Context(new PostGres(connectionPostgres,model))
     await postgres.update(null,USER_DB,true)
  })

  it("Deve obter um token",async ()=>{
    const result = await app.inject({
      method:"POST",
      url:"/login",
      payload:USER
    })

    const statusCode= result.statusCode
    const dados = JSON.parse(result.payload)
    assert.deepEqual(statusCode,200)
    assert.ok(dados.token.length>10)
  })

  it("Deve retornar não autorizado ao tentar obter um login errado", async ()=>{
    const result = await app.inject({
      method:"POST",
      url:"/login",
      payload:{
        username:"JoaoV",
        password:"123"
      }
    })
    const statusCode=result.statusCode
    const dados =JSON.parse(result.payload)
    
    assert.deepEqual(statusCode,401)
    assert.deepEqual(dados.error, "Unauthorized")
  })
})