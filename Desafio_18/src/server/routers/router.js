import logRequest from "../middlewares/log.js";
import auth from "../middlewares/auth.js";
import { Router } from "express";
import {

    CONTROLLER_REGISTER,
    CONTROLLER_LOGIN,
    controllerFailRegister,
    controllerSuccessLogin,
    controllerFailLogin,
    controllerHome,
    controllerLogout,
    controllerAllRoutes

} from "../controllers/controllers.js";

export const ROUTER = Router();

ROUTER.get("/", auth, logRequest, controllerHome);
ROUTER.post("/register", CONTROLLER_REGISTER);
ROUTER.post("/login", CONTROLLER_LOGIN);
ROUTER.post("/register/fail", controllerFailRegister);
ROUTER.post("/login/success", controllerSuccessLogin);
ROUTER.post("/login/fail", controllerFailLogin);
ROUTER.delete("/logout", auth, controllerLogout);

ROUTER.use("*", controllerAllRoutes);