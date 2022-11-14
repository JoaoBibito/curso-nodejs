const {default: mongoose} = require("mongoose");
const Mongoose = require("mongoose");
const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectando",
};
const ICrud = require("./interfaces/InterfaceCrud");
class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this.driver = null;
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }
  defineModel() {
    const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true,
      },
      poder: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });
    this._herois = Mongoose.model("herois", heroiSchema);
  }
  connect() {
    Mongoose.connect(
      "mongodb://joaobibito:79878559@localhost:27017/herois",
      {useNewUrlParser: true},
      function (error) {
        if (!error) return;
        console.log("Falha na conexão", error);
      },
    );
    const connection = Mongoose.connection;
    this._driver = connection;
    connection.once("open", () => console.log("Database rodando!!"));
    this.defineModel();
  }
  async create(item) {
    const resultCadastrar = await this._herois.createsad(item);
    console.log("result cadastrar", resultCadastrar);
  }
}

module.exports = MongoDB;
