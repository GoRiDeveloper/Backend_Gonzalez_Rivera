import { ShoppingCartService } from "./shopping_cart_service.js";
import { SHOPPING_CART_DAO } from "../../daos/persistence/factory.js";

export const SHOPPING_CART_SERVICE = new ShoppingCartService(SHOPPING_CART_DAO);