/*
0 - obeter um usuario
1 - Obter o numero do telefone de um usuario a partir de seu id
2 - Obter o endereco do usuario pelo Id
*/
const util = require('util')
const obterEnderecoAsync = util.promisify(getAdress)
function getUser (){
    return new Promise(function resolvePrmisse(resolve, reject){
        setTimeout(function(){
                return resolve({
                    id:1,
                    nome:"Aladin",
                    dataNact:new Date()
                })},1000 )
    })
}

function getPhone(idUser){
    return new Promise(function resolvePrmisse(resolve,reject){
        setTimeout(function(){
                return resolve({
                    telefone:"1196970",
                    DDD:11
                })},2000)
    })
    
}

function getAdress(idUser,callback){
    setTimeout(() => {
        return callback(null,{
            rua:"São José Lumiar",
            numero:321
        })
    }, 2000);
}

//add palavra asyn na function -> return automaticamente uma Promise
main()
async function main(){
try{
    console.time("medida-promise")
    const usuario = await getUser();
    // const telefone= await getPhone(usuario.id);
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado= await Promise.all([
        getPhone(usuario.id),
        obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
    Nome:${usuario.nome}
    Telefone: ${telefone.DDD} ${telefone.telefone}
    Endereco: ${endereco.rua} ${endereco.numero}`)
    console.timeEnd("medida-promise")
}
catch(error){
console.error("DEU RUIN", error)
}
}
// const userPromise=getUser()

// userPromise
//     .then(function(usuario){
//         return getPhone(usuario.id)
//         .then(function resolverPhone(result){
//             return{
//                 usuario:{
//                     nome:usuario.nome,
//                     id:usuario.id
//                 },
//                 telefone:result
//             }
//         })
//     })
//     .then(function(resultado){
//         {
//             const endereco = obterEnderecoAsync(resultado.usuario.id)
//             return endereco.then(function resolveEndereco(result){
//                 return{
//                     usuario:resultado.usuario,
//                     telefone:resultado.telefone,
//                     endereco:result
//                 }
//             })
//         }
//     }    ) 
//     .then(function(resultado){
//         console.log(`
//             Nome:${resultado.usuario.nome}
//             Endereço:${resultad.endereco.rua}, ${resultado.endereco.numero}
//             Telefone: ${resultado.telefone.DDD} ${Resultado.telefone.telefone}`)
//     })
//     .catch(function(error){
//         console.log("Deu ruin no .then",error)
//     })