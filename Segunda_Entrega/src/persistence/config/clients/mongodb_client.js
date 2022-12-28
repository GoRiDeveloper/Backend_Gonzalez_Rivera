import { MongoClient } from "mongodb";
import { CNX_STR, DB_NAME } from "../config.js";

const MDB_CLIENT = new MongoClient(CNX_STR);

await MDB_CLIENT.connect();

export const MDB = MDB_CLIENT.db(DB_NAME);