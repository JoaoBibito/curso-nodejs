const service = require('./services')

Array.prototype.meuMap=function(callback){
    const novoArrayMaeado = []
    for(let indice=0;indixe<=this.length-1;indice++){
        const resultado = callback(this[indice],indice)
        novoArrayMaeado.push(resultado)
    }
    return novoArrayMaeado
} 

async function main(){
    try{
        const results = await service.obterPessoas('')
        // const names = []
        // results.results.forEach(function(item) {
        //     names.push(item.name)
        // });

        // const names = results.results.map(function(pessoa){
        //     return pessoa.name
        // })

        // const names = results.results.map((pessoa)=>pessoa.name)

        const names= results.results.meuMap(function(pessoa, indice){
            return `[${indice}]${pessoa.name}`
        })
     
       console.log("Names",names)
    }
    catch(error){
        console.error("Deu ruin", error)
    }
}
main()