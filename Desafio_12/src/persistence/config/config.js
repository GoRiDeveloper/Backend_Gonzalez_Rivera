import { config } from "dotenv";

config({ path: "variables.env" });

const

CNX_STR     = process.env.CNX_STR_REMOTE,
DB_NAME     = process.env.DB_NAME,
PERSISTENCE = process.env.PERSISTENCE,
SECRET      = process.env.SECRET;

export {

    CNX_STR,
    DB_NAME,
    PERSISTENCE,
    SECRET

};