const {default: mongoose} = require("mongoose");
const Mongoose = require("mongoose");
Mongoose.connect(
  "mongodb://joaobibito:79878559@localhost:27017/herois",
  {useNewUrlParser: true},
  function (error) {
    if (!error) return;
    console.log("Falha na conexão", error);
  },
);
const connection = Mongoose.connection;

//Exemplos função
function nomeFuncao() {}
const minhafuncao = function () {};
const minhaFuncaoArrow = (params) => {};

connection.once("open", () => console.log("Database rodando!!"));

/*
setTimeout(() => {
  
  console.log("State", state);
}, 5000);
0: Desconectado
1: Conectado
2: Conectando
3: Desconectando
*/

async function main() {
  const resultCadastrar = await model.create({
    nome: "Batman",
    poder: "Dinheiro",
  });
  console.log("result cadastrar", resultCadastrar);
  const listItens = await model.find();
  console.log("Items", listItens);
}
main();
