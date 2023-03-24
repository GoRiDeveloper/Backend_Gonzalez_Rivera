const { crearArchivo } = require("./multiplicar");

console.clear();

const [ , , argv3 = "base=1"] = process.argv;
const [ , base = 5] = argv3.split("=");

crearArchivo(base) 
    .then(nombreArchivo => 
        console.log(nombreArchivo, "creado"))
    .catch(err => 
        console.log(err));