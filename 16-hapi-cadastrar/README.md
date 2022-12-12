docker run \
 --name postgres\
 -e POSTGRES_USER=JoaoBibito\
 -e POSTGRES_PASSWORD=senha\
 -e POSTGRES_DB=heros \
 -p 5432:5432\
 -d `
postgres

docker exec -it postgres /bin/bash

docker exec -ti postgres psql -U JoaoBibito heroes

docker run \
 --name adminer\
 -p 8080:8080\
 --link postgres:postgres\
 -d\
 adminer

### ~~~ Mongo DB

docker run \
 --name mongosb \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME=admin\
 -e MONGO_INITDB_ROOT_PASSWORD=79878559 \
 -d\
 mongo:4

docker run \
 --name mongoclient\
 -p 3000:3000 \
 --link mongodb:mongodb\
 -d \
 mongoclient/mongoclient

docker exec -it mongodb \
 mongo --host localhost -u admin -p 79878559 --authenticationDatabase admin \
 --eval "db.getSiblingDB('herois').createUser({user:'joaobibito', pwd:'79878559', roles:[{role:'readWrite', db:'herois'}]})"
