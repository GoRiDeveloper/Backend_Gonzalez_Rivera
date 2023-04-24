import { ProductService } from "./products_service.js";
import { PROD_DAO } from "../../daos/persistence/factory.js";

export const PROD_SERVICE = new ProductService(PROD_DAO);