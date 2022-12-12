const {AssertionError} = require("assert");
const assert = require("assert");
const {stat} = require("fs");
const api = require("../api");
let app = {};
const MOCK_HEROIS_CADASTRAR = {
  nome: "Chapolin Colorado",
  poder: "Marreta Bionica",
};
describe("Suite de testes da API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar /herois", async function () {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
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
  it("Listar/herois - deve um erro com limit incorreto ", async function () {
    const TAMANHO_LIMITE = "AE";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: {source: "query", keys: ["limit"]},
    };
    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
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
  it("Cadastrar POST - /herois", async function () {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROIS_CADASTRAR),
    });
    const statusCode = result.statusCode;
    console.log(result.payload);
    const {message, _id} = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });
});
