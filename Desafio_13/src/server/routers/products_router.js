import { Router } from "express";
import { controllerGetProducts } from "../controllers/products_controllers.js";

const PRODUCTS_ROUTER = Router();

PRODUCTS_ROUTER.get("/", controllerGetProducts);

export { PRODUCTS_ROUTER };