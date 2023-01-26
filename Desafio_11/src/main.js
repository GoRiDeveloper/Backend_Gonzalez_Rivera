import { SERVER_CONECT } from "./server.js";

const PORT = 8080 ?? process.env.PORT;

async function server () {

    try {

        const NEW_SERVER = await SERVER_CONECT(PORT);
        console.log(`¡Servidor Conectado En El Puerto : ${NEW_SERVER.address().port}!`);
        
    } catch (err) {

      console.log(`¡¡ERROR : ${err} !!`);

    };

};

server();