import { Router } from "express";
import auth from "../middlewares/auth.js";
import {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct, 
    controllerPatchProduct,
    controllerDeleteProduct

} from "../controllers/products_controllers.js";

export const PRODS_ROUTER = Router();

PRODS_ROUTER.get("/", auth, controllerGetProducts);
PRODS_ROUTER.get("/:id", auth, controllerGetProduct);
PRODS_ROUTER.post("/", auth, controllerPostProduct);
PRODS_ROUTER.put("/:id", auth, controllerPutProduct);
PRODS_ROUTER.patch("/:id", auth, controllerPatchProduct);
PRODS_ROUTER.delete("/:id", auth, controllerDeleteProduct);