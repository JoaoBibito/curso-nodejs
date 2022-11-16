const assert = require("assert");
const Mongodb = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const MOCK_HEROIS_CADASTRAR = {
  nome: "Mulher Maravilha",
  poder: "Laço",
};
const MOCK_HEROIS_DEFAULT = {
  nome: `Homem Aranha-${Date.now()}`,
  poder: "Super teia",
};
const MOCK_HEROIS_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  poder: "Velocidade",
};
let MOCK_HEROI_ID = "";
const context = new Context(new Mongodb());
describe("MongoDB Suite de testes", function () {
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROIS_DEFAULT);
    const result = await context.create(MOCK_HEROIS_ATUALIZAR);
    console.log("conectado");
    MOCK_HEROI_ID = result.id;
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
  it("Listar", async () => {
    const [{nome, poder}] = await context.read({
      nome: MOCK_HEROIS_DEFAULT.nome,
    });
    const result = {
      nome,
      poder,
    };
    assert.deepEqual(result, MOCK_HEROIS_DEFAULT);
  });
  it("Atualizar", async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: "Pernalonga",
    });
    assert.deepEqual(result.modifiedCount, 1);
  });
  it("Remover", async () => {
    const result = await context.delete(MOCK_HEROI_ID);
    assert.deepEqual(result.deletedCount, 1);
  });
});
