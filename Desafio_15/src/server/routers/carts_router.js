import { Router } from "express";
import auth from "../middlewares/auth.js";
import { 

    controllerGetIdCart,
    controllerPostCart,
    controllerPostProductIdCart,
    controllerDeleteProductsCart,
    controllerDeleteIdProductCart

} from "../controllers/carts_controllers.js";

export const CARTS_ROUTER = Router();

CARTS_ROUTER.get("/:id_cart/products", auth, controllerGetIdCart);
CARTS_ROUTER.post("/", auth, controllerPostCart);
CARTS_ROUTER.post("/:id_cart/products/:id_prod", auth, controllerPostProductIdCart);
CARTS_ROUTER.delete("/:id_cart", auth, controllerDeleteProductsCart);
CARTS_ROUTER.delete("/:id_cart/products/:id_prod", auth, controllerDeleteIdProductCart);