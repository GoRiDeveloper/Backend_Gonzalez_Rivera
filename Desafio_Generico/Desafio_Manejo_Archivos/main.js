/*const sumar = n1 => sumarN1 = n2 => n1 + n2;

const sumar15 = sumar(15);
const resultado = sumar15(25);
console.log(resultado); */

const { conect } = require("./server.js");

const inicializate = async () => {

    try {

        const newServer = await conect(8080);
        console.log("¡¡Conectado a el puerto : " + newServer.address().port + " !!");

    } catch (err) {

        console.log("Error :" + err);

    }

};

inicializate();