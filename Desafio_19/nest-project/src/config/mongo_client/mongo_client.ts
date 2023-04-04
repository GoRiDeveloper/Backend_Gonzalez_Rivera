import { MongoClient } from "mongodb";
import { CONFIG } from "../config";

let mdbClient = undefined;

async function conectMongo (): Promise<void> {

    mdbClient = await new MongoClient(CONFIG.cnxStr).connect();

};

conectMongo();

export const MDB = mdbClient.db(CONFIG.dbName) || "";