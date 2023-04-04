import { DaoMongoDB } from "./mongodb_dao";
import { CONFIG } from "../config/config";

export const PRODS = new DaoMongoDB(CONFIG.prodsCollection);