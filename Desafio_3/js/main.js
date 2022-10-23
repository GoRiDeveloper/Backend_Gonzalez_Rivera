const { conect } = require("./server.js");

const inicializate = async () => {

    try {

        const server = await conect(8080);
        console.log(`¡¡Conectado al puerto : ${server.address().port} !!`);

    } catch (err) {

        console.log(`¡¡¡ERROR : ${err} !!!`);

    }

};

inicializate();