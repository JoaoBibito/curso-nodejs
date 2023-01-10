const assert = require("assert")
const PasswordHelper = require("../helpers/passwordhelper")
const SENHA= "JoaoVitor123123"
const HASH="$2b$04$Rf2cRKUn4mcVnfsLnyR.c.Wv78XwSbGWN.N2OVCssxDGiQkNrBnHe"
describe.only('UserHelper test suite', function(){
  it('Deve gerar um hash a partir de uma senha', async ()=>{
    const result= await PasswordHelper.hashPassword(SENHA)
    console.log("Result", result)
    assert.ok(result.length>10)
  })

  it("Deve comparar uma senha e seu hash", async()=>{
    const result =await PasswordHelper.comparePassword(SENHA,HASH)
    console.log("Result", resutl)
    assert.ok(result )
  })
})