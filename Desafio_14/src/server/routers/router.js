import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { 
    
    logRequest,
    CONTROLLER_REGISTER,
    CONTROLLER_LOGIN,
    controllerHome, 
    controllerRedirectLogin,
    controllerRedirectRegister,
    controllerSuccessRegister,
    controllerFailRegister,
    controllerSuccessLogin,
    controllerFailLogin,
    controllerLogout,
    controllerInfo,
    controllerAllRoutes

} from "../controllers/controllers.js";

export const ROUTER = Router();

ROUTER.use(logRequest);
ROUTER.get("/", controllerHome);
ROUTER.get("/register", controllerRedirectRegister);
ROUTER.post("/register", CONTROLLER_REGISTER);
ROUTER.get("/register/success", controllerSuccessRegister);
ROUTER.get("/register/fail", controllerFailRegister);
ROUTER.get("/login", controllerRedirectLogin);
ROUTER.post("/login", CONTROLLER_LOGIN);
ROUTER.get("/login/success", controllerSuccessLogin);
ROUTER.get("/login/fail", controllerFailLogin);
ROUTER.delete("/logout", auth, controllerLogout);
ROUTER.get("/info", controllerInfo);
ROUTER.use("*", controllerAllRoutes);