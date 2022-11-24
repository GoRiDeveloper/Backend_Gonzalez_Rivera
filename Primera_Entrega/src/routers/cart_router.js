import { Router } from "express";
import {

    controllerPostCart,
    controllerDeleteProductsCart,
    controllerPostProductIdCart,
    controllerGetIdCart,
    controllerDeleteIdProduct

} from "../controllers/controllers_cart.js";

const routerCart = Router();

routerCart.post("/", controllerPostCart);
routerCart.delete("/:id_cart", controllerDeleteProductsCart);
routerCart.post("/:id_cart/products", controllerPostProductIdCart);
routerCart.get("/:id_cart/products", controllerGetIdCart);
routerCart.delete("/:id_cart/products/:id_prod", controllerDeleteIdProduct);

export default routerCart;