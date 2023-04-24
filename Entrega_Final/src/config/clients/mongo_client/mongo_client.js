import { MongoClient } from "mongodb";
import { CONFIG, DEV_MODE } from "../../config.js";
import ErrDB from "../../../server/models/errors/error_db.js";

let mdbClient, mongoDB;

try {

    DEV_MODE
        ? mdbClient = await new MongoClient(CONFIG.cnxStrDev, { authSource: "admin" }).connect()
        : mdbClient = await new MongoClient(CONFIG.cnxStrProd).connect();

    if (mdbClient) mongoDB = mdbClient.db(CONFIG.dbName);
    if (!mongoDB) throw new ErrDB("Could don't connect.");
        
} catch (e) {
        
        throw new ErrDB(e);

};

export default mongoDB;