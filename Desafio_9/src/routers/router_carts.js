import { 

    controllerPostCart,
    controllerDeleteProductsCart, 
    controllerPostProductIdCart,
    controllerGetIdCart,
    controllerDeleteIdProductCart

} from "../controllers/controllers_carts.js";
import { Router } from "express";

const CARTS_ROUTER = Router();

CARTS_ROUTER.post("/", controllerPostCart);
CARTS_ROUTER.delete("/:id_cart", controllerDeleteProductsCart);
CARTS_ROUTER.post("/:id_cart/products", controllerPostProductIdCart);
CARTS_ROUTER.get("/:id_cart/products", controllerGetIdCart);
CARTS_ROUTER.delete("/:id_cart/products/:id_prod", controllerDeleteIdProductCart);

export default CARTS_ROUTER;