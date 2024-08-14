const fs = require('fs');
const json2csv = require('json2csv');
const { parse } = require('csv-parse/sync');


let contenido = fs.readFileSync('Video Games Sales.csv', 'utf-8');
let interpretado = parse(contenido, 
{
    columns: true,
    cast: (value, context) => {
        if (context.column === 'index' || context.column === 'Rank' || context.column === 'Year' || context.column === 'North America' || context.column === 'Europe' || context.column === 'Japan' || context.column === 'Rest of World' || context.column === 'Global' || context.column === 'Review') return Number(value)
        return value;
    }
});


let maximaRelacion;
let minimaRelacion;
let maximo;
let minimo;
let generos=[];
for(let i = 0; i < interpretado.length; i++) {
    let relacion = interpretado[i].Global / interpretado[i].Review;
    if(i===0){
        maximaRelacion = relacion
        maximo = i;
        minimaRelacion = relacion
        minimo = i;
        generos[0] = interpretado[i]['Genre'];
    }
    else {
        if(relacion > maximaRelacion){
            maximaRelacion = relacion
            maximo = i;
        } else if(relacion < minimaRelacion){
            minimaRelacion = relacion
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
console.log(generos);

let NuevoInterpretado = []

function columnaRelacion(){
    for(let i = 0; i < interpretado.length; i++){
        let relacion = interpretado[i].Global / interpretado[i].Review;
        interpretado[i].relacion = relacion;
        NuevoInterpretado.push(interpretado[i]);
    }
    let NuevoCsv = "";
    for(let i = 0; i<Object.keys(NuevoInterpretado[0]).length;i++){
        if (NuevoCsv != ""){
        NuevoCsv = NuevoCsv + "," + Object.keys(NuevoInterpretado[0])[i];
        } else {
            NuevoCsv = Object.keys(NuevoInterpretado[0])[i];
        }
    }
    NuevoCsv = NuevoCsv + "\n"
    console.log(NuevoCsv)
    for(let i = 0; i<NuevoInterpretado.length; i++){
        for(let a = 0; a < Object.values(NuevoInterpretado[0]).length; a++){
            if(a===0){
                NuevoCsv = NuevoCsv + Object.values(NuevoInterpretado[i])[a];
            } else {
                NuevoCsv = NuevoCsv + "," + Object.values(NuevoInterpretado[i])[a];
            }
        }
        NuevoCsv = NuevoCsv + "\n";
    }
    fs.writeFileSync("NuevaBase.csv", NuevoCsv, 'utf-8');
    console.log("Terminado");
}
columnaRelacion();


// fs.appendFile('Video Games Sales.csv', '1907,1908,Minecraft,PC,2011.0,Adventure,Mojang,,,,,300.00,10', function (err) {
//     if (err) throw err;
//     console.log('Listo!');
//   });