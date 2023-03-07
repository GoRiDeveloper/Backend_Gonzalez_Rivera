import { MongoClient } from "mongodb";
import {CONFIG} from "../../config.js";

const MDB_CLIENT = await new MongoClient(CONFIG.cnxStr).connect();

export default MDB_CLIENT.db(CONFIG.dbName);