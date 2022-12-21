import {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

} from "../controllers/controllers_products.js"
import { Router } from "express";

const PRODS_ROUTER = Router();

PRODS_ROUTER.get("/", controllerGetProducts);
PRODS_ROUTER.get("/:id", controllerGetProduct);
PRODS_ROUTER.post("/", controllerPostProduct);
PRODS_ROUTER.put("/:id", controllerPutProduct);
PRODS_ROUTER.delete("/:id", controllerDeleteProduct);

export default PRODS_ROUTER;