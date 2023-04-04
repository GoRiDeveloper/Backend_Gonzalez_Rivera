import { config } from "dotenv";

config({ path: ".env" });

export const CONFIG = {

    cnxStr: process.env.CNX_STR_REMOTE,
    dbName: process.env.DB_NAME,
    prodsCollection: process.env.COLLECTION_PRODUCTS

};