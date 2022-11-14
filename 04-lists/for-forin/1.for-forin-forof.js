const service = require('./services')

async function main(){
try{
    const result = await service.obterPessoas('')
    const nomes = []
    console.time('for')
    for(let i =0;i<=result.results.length-1;i++){
        const pessoa = result.results[i]
        nomes.push(pessoa.name)
    }
    console.timeEnd('for')

    console.time('forin')
    for(let i in result.results){
        const pessoa = result.results[i]
        nomes.push(pessoa.name)
    }
    console.timeEnd('forin')

    console.time('forof')
    for(pessoa of result.results){
        nomes.push(pessoa.name)
    }
    console.timeEnd('forof')
    
    console.log('names', nomes)
}
catch(error){
    console.error("Deu ruin", error)
}
}

main()