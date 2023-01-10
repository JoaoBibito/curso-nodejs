const {AssertionError} = require("assert");
const assert = require("assert");
const api = require("../api");
const heroisSchema = require("../db/strategies/mongodb/schemas/heroisSchema");
let app = {};
const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpob24gRG9lIiwiaWQiOjEsImlhdCI6MTY3MzI4NTIzNX0.VoNw90b0O0jXmsUUJlyQJcGMNPcOjhJdl0agh1MWSuI'
const headers={
  Authorization:TOKEN
}
const MOCK_HEROIS_CADASTRAR = {
  nome: "Chapolin Colorado",
  poder: "Marreta Bionica",
};
const MOCK_HEROIS_INICIAL = {
  nome: "Gavião Negro",
  poder: "A mira",
};
let MOCK_ID=""
describe("Suite de testes da API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      headers,
      method: "POST",
      url: "/herois",
      payload: JSON.stringify(MOCK_HEROIS_INICIAL),
    });
    const dados = JSON.parse(result.payload)
    MOCK_ID = dados._id
  });

  it("Listar /herois", async function () {
    const result = await app.inject({
      headers,
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
      headers,
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
      headers,
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
      headers,
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
  });
  it("Cadastrar POST - /herois", async function () {
    const result = await app.inject({
      headers,
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROIS_CADASTRAR),
    });
    const statusCode = result.statusCode;
    const {message, _id} = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Heroi cadastrado com sucesso!");
  });
  it("Atualizar PATCH - /herois/:id", async function () {
    const _id=MOCK_ID
    const expected = {
      poder:"Super mira"
    }

    const result = await app.inject({
      headers,
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
    });
    const statusCode = result.statusCode
    const dados  =JSON.parse(result.payload)
    
    assert.ok(statusCode===200)
    assert.deepEqual(dados.message,"Heroi atualizado com sucesso!")
  });
  it("Atualizar PATCH - /herois/:id - não deve atualizar com id incorreto!", async function (){
    const id= "63a495698800bc9953c101e0"

    const result = await app.inject({
      headers,
      method:"PATCH",
      url:`/herois/${id}`,
      payload:JSON.stringify({
      poder:"Super mira",
    })
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    const expected= {
      statusCode: 412,
      error: 'Precondition Failed',
      message: 'Id não encontrado no banco!'
    }
    assert.ok(statusCode===412)
    assert.deepEqual(dados,expected)
  })
  it("Remover DELETE - /herois/:id", async function (){
    const _id = MOCK_ID
    const result = await app.inject({
      headers,
      method:"DELETE",
      url:`/herois/${_id}`,
    })
    const statusCode= result.statusCode
    assert.ok(statusCode===200)
    assert.deepEqual(result.payload, "Heroi removido com sucesso!")
  })

  it("Remover DELETE - /herois/:id não deve remover ", async function (){
    const _id = "63b305c848a35159f1e9f236"
    const result = await app.inject({
      headers,
      method:"DELETE",
      url:`/herois/${_id}`,
    })
    const statusCode= result.statusCode
    const dados=JSON.parse(result.payload)
    assert.ok(statusCode===200)
    assert.deepEqual(dados.message,"Não foi possível atualizar!")
  })
});
