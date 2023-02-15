import parseArgs from "minimist";
import { config } from "dotenv";

config({ path: "variables.env" });

const 

OPTIONS     = {

    default: {

        MODO: "fork",
        PORT: 8080

    }

},

CONFIG      = parseArgs(process.argv.slice(2), OPTIONS),
CNX_STR     = process.env.CNX_STR_REMOTE,
DB_NAME     = process.env.DB_NAME,
PERSISTENCE = process.env.PERSISTENCE,
SECRET      = process.env.SECRET;

export {

    CONFIG,
    CNX_STR,
    DB_NAME,
    PERSISTENCE,
    SECRET

};