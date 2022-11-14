const eventEmitter = require('events')
const { resolve } = require('path')
class MeuEmissor extends eventEmitter{

}
const meuEmissor = new MeuEmissor()
const nomeEnvento  ='usuario:click'
meuEmissor.on(nomeEnvento, function(click){
    console.log("Um usuário cicou", click)
})

// meuEmissor.emit(nomeEnvento,"Na barra de rolagem")
// meuEmissor.emit(nomeEnvento,"No ok")

// let count =0;
// setInterval(function(){
//     meuEmissor.emit(nomeEnvento,"no ok "+ (count++))
// },1000)

const stdin = process.openStdin()
function main(){
    return new Promise(function (resolve,reject){
        stdin.addListener('data', function(value){
            console.log(`Você digitou ${value.toString().trim()}`)
            return resolve(value)
    })
})
}
main().then(function(resultado){
    console.log('Resultado',resultado)
})
