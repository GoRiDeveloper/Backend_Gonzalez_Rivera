import { Router } from "express";
import { LOGIN } from "../utils/auth/passport_auth.js";
import { controllerPostAuth } from "../controllers/sessions_controller.js";

export const SESSIONS_ROUTER = Router();

SESSIONS_ROUTER.post("/", LOGIN, controllerPostAuth);