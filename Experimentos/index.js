const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');
const { CsvStringifier } = require('csv-writer/src/lib/csv-stringifiers/abstract');

let contenido = readFileSync('Video Games Sales.csv', 'utf-8');
let interpretado = parse(contenido);
console.log(interpretado);