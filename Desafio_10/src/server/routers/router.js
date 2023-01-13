import { Router } from "express";
import { controllerGetRouter } from "../controllers/controllers.js";

const ROUTER = Router();

ROUTER.get("/", controllerGetRouter);

export { ROUTER };