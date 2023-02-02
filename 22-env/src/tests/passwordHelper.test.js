const assert = require("assert")
const PasswordHelper = require("../helpers/passwordhelper")

const SENHA= "JoaoBibito123123"
const HASH="$2b$04$nltkf5/TfVf4S9YA5JjQROILDp1PJAY04kqA87hFiGFuVBuQeoawq"
describe('UserHelper test suite', function(){
  it('Deve gerar um hash a partir de uma senha', async ()=>{
    const result= await PasswordHelper.hashPassword(SENHA)
    assert.ok(result.length>10)
  })

  it("Deve comparar uma senha e seu hash", async()=>{
    const result =await PasswordHelper.comparePassword(SENHA,HASH)
    assert.ok(result )
  })
})