const assert = require("assert");
const Mongodb = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const MOCK_HEROIS_CADASTRAR = {
  nome: "Mulher Maravilha",
  poder: "Laço",
};
const context = new Context(new Mongodb());
describe("MongoDB Suite de testes", function () {
  this.beforeAll(async () => {
    await context.connect();
    console.log("conectado");
  });
  it("Verifica conexão", async () => {
    const result = await context.isConnected();
    const expected = "Conectado";
    assert.deepEqual(result, expected);
  });
  it("Cadastrar", async () => {
    const {nome, poder} = await context.create(MOCK_HEROIS_CADASTRAR);
    assert.deepEqual({nome, poder}, MOCK_HEROIS_CADASTRAR);
  });
});
