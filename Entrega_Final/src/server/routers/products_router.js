import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import { isAdmin } from "../middlewares/admin.js";
import {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

} from "../controllers/products_controller.js";

export const PRODUCTS_ROUTER = Router();

PRODUCTS_ROUTER.get("/", controllerGetProducts);
PRODUCTS_ROUTER.get("/:id", controllerGetProduct);
PRODUCTS_ROUTER.post("/", isAuth, isAdmin, controllerPostProduct);
PRODUCTS_ROUTER.put("/:id", isAuth, isAdmin, controllerPutProduct);
PRODUCTS_ROUTER.delete("/:id", isAuth, isAdmin, controllerDeleteProduct);