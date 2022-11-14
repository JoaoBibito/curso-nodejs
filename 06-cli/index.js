const Commander = require("commander");
const database = require("./database");
const Database = require("./database");
const Heroi = require("./heroi");
async function main() {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i,--idm [value]", "Id do Heroi")

    .option("-c, --cadastrar", "Cadastrar um Heroi")
    .option("-l, --listar", "listar um Heroi")
    .option("-r, --remover ", "Remover um Heroi pelo id")
    .option("-a, --atualizar [value]", "Atualizar um Heroi pelo id")
    .parse(process.argv);
  const heroi = new Heroi(Commander.opts());
  const id = heroi.id <= 2 ? heroi.id : Date.now();
  try {
    if (Commander.opts().cadastrar) {
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);
      if (!resultado) {
        console.error("Heroi não foi cadastrado", error);
        return;
      }
      console.log("Heroi cadastrado com sucesso");
    }

    if (Commander.opts().listar) {
      const resultado = await database.listar();
      console.log(resultado);
      return;
    }

    if (Commander.opts().remover) {
      const resultado = await database.remover(heroi.id);
      if (!resultado) {
        console.error("Não foi possivel remover o Heroi");
        return;
      }
      console.log("Heroi removido com sucesso!");
    }

    if (Commander.opts().atualizar) {
      const idParaAtualizar = parseInt(Commander.opts().atualizar);
      const dado = JSON.stringify(heroi);
      const heroiAtualizar = JSON.parse(dado);
      const resultado = await database.atualizar(
        idParaAtualizar,
        heroiAtualizar,
      );
      if (!resultado) {
        console.error("Não foi possivel atualizar o Heroi");
        return;
      }
      console.log("Heroi atualizado com sucesso");
    }
  } catch (error) {
    console.error("deu ruin", error);
  }
}

main();
