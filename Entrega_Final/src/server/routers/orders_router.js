import { Router } from "express";
import { isAuth } from "../middlewares/auth.js";
import { 
    
    controllerGetOrders, 
    controllerPostOrder 

} from "../controllers/orders_controller.js";

export const ORDERS_ROUTER = Router();

ORDERS_ROUTER.get("/", isAuth, controllerGetOrders);
ORDERS_ROUTER.post("/", isAuth, controllerPostOrder);