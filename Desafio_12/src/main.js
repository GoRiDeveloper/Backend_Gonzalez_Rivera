import parseArgs from "minimist";
import { SERVER_CONECT } from "./server.js";

const 

OPTIONS = {

    default: {

        PORT: 8080

    }

},
CONFIG = parseArgs(process.argv.slice(2), OPTIONS);

async function server () {

    try {

        const NEW_SERVER = await SERVER_CONECT(CONFIG.PORT);
        console.log(`¡Servidor Conectado En El Puerto : ${NEW_SERVER.address().port}!`);
        
    } catch (err) {

        console.log(`¡¡ERROR : ${err} !!`);

    };

};

server();