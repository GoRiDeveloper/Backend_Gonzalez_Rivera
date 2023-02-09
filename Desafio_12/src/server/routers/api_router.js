import { Router } from "express";
import { controllerRandoms } from "../controllers/api_controllers.js";

const API_ROUTER = Router();

API_ROUTER.get("/randoms", controllerRandoms);

export { API_ROUTER };