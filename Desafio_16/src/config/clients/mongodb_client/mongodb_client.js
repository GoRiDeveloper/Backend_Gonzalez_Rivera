import { MongoClient } from "mongodb";
import {CONFIG, mdbPersistence} from "../../config.js";

const 

MDB_CLIENT = mdbPersistence && await new MongoClient(CONFIG.cnxStr).connect(),
MDB        = mdbPersistence && MDB_CLIENT.db(CONFIG.dbName) || "";

export default MDB;