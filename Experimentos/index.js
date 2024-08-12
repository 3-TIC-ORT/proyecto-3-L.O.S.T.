const fs = require('fs')
const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');

let contenido = readFileSync('Video Games Sales.csv', 'utf-8');
let interpretado = parse(contenido, 
{
    columns: true,
    cast: (value, context) => {
        if (context.column === 'index' || context.column === 'Rank' || context.column === 'Year' || context.column === 'North America' || context.column === 'Europe' || context.column === 'Japan' || context.column === 'Rest of World' || context.column === 'Global' || context.column === 'Review') return Number(value)
        return value;
    }
});
// console.log(interpretado);

let maximaDiferencia;
let minimaDiferencia;
let maximo;
let minimo;
let generos=[];
for(let i = 0; i < interpretado.length; i++) {
    let diferencia = interpretado[i].Global / interpretado[i].Review;
    if(i===0){
        maximaDiferencia = diferencia
        maximo = i;
        minimaDiferencia = diferencia
        minimo = i;
        generos[0] = interpretado[i]['Genre'];
    }
    else {
        if(diferencia > maximaDiferencia){
            maximaDiferencia = diferencia
            maximo = i;
        } else if(diferencia < minimaDiferencia){
            minimaDiferencia = diferencia
            minimo = i;
        }
    }
    let existe = false;
    for(let a=0; a < generos.length; a++){
        if(generos[a] === interpretado[i]['Genre']){
            existe = true;
        }
    }
    if (existe===false){
        generos.push(interpretado[i]['Genre'])
    }
}


console.log(`Máximo: Nombre: ${interpretado[maximo]['Game Title']} ${interpretado[maximo]['Global']}  ${interpretado[maximo]['Review']}`);
console.log(`Mínimo: Nombre: ${interpretado[minimo]['Game Title']} ${interpretado[minimo]['Global']}  ${interpretado[minimo]['Review']}`);
// console.log(generos);




// fs.appendFile('Video Games Sales.csv', '1907,1908,Minecraft,PC,2011.0,Adventure,Mojang,,,,,300.00,10', function (err) {
//     if (err) throw err;
//     console.log('Updated!');
//   });