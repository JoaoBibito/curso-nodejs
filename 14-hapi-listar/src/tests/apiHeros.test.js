const assert = require("assert");
const api = require("../api");
let app = {};
describe("Suite de testes da API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar /herois", async function () {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=1000",
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });
  it("Listar/herois - deve retornar somente 10 registros", async function () {
    const TAMANHO_LIMITE = 3;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length == TAMANHO_LIMITE);
  });
  it("Listar/herois - deve filtrar um item", async function () {
    const TAMANHO_LIMITE = 10;
    const NAME = "Homem Aranha-1668606321321";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
  });
});
