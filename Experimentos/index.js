const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');

let contenido = readFileSync('Video Games Sales.csv', 'utf-8');
let interpretado = parse(contenido, {columns: true});
console.log(interpretado);
