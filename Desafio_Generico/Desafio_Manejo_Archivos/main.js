/*const sumar = n1 => sumarN1 = n2 => n1 + n2;

const sumar15 = sumar(15);
const resultado = sumar15(25);
console.log(resultado); */

const fs = require("fs");

const promise = fs.promises.readFile("./main.js", "utf-8");

promise.then(res => console.log(res)).catch(err => console.log(err));