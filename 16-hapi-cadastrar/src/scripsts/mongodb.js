// docker ps
// docker exec -it 7dc60b50971f \
//     mongo -u joaobibito -p 79878559 --authenticationDatabase herois

//databases
//show dbs

// mudando o contexto para uma database
//use herois

// mostrat tables (coleções)
//show collections

db.herois.insert({
  nome: "Flash",
  poder: "velocidade",
  dataNascimento: "1998-01-01",
});

db.herois.find();
db.herois.find().pretty();

for (let i = 0; i <= 10000; i++) {
  db.herois.insert({
    nome: `Clone${i}`,
    poder: "Velocidade",
    dataNascimento: "1998-01-01",
  });
}

db.herois.count();
db.herois.findOne();
db.herois.find().limit(1000).sort({});

//create
db.herois.insert({
  nome: "Flash",
  poder: "velocidade",
  dataNascimento: "1998-01-01",
});

//read
db.herois.find();

//update
db.herois.update(
  {_id: ObjectId("636ba436ed7fc26db5d4b361")},
  {nome: "lanterna Verde"},
);
db.herois.update(
  {_id: ObjectId("636ba436ed7fc26db5d4b361")},
  {$set: {nome: "lanterna Verde"}},
); //$set altera somente a propriedade especificada

//delete
db.herois.remove({});
