import { Router } from "express";
import { controllerGetProducts } from "../controllers/products_controllers.js";

export const PRODUCTS_ROUTER = Router();

PRODUCTS_ROUTER.get("/", controllerGetProducts);