import { MongoClient } from "mongodb";
import { CNX_STR, DB_NAME } from "../../config.js";

const MDB_CLIENT = await new MongoClient(CNX_STR).connect();

export const MDB = MDB_CLIENT.db(DB_NAME);