import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { 
    
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
    controllerAllRoutes

} from "../controllers/controllers.js";

const ROUTER = Router();

ROUTER.get("/", controllerHome);
ROUTER.get("/register", controllerRedirectRegister);
ROUTER.post("/register", CONTROLLER_REGISTER);
ROUTER.get("/register/success", controllerSuccessRegister);
ROUTER.get("/register/fail", controllerFailRegister);
ROUTER.get("/login", controllerRedirectLogin);
ROUTER.post("/login", CONTROLLER_LOGIN);
ROUTER.get("/login/success", controllerSuccessLogin);
ROUTER.get("/login/fail", controllerFailLogin);
ROUTER.delete("/logout", isAuthenticated, controllerLogout);
ROUTER.use("*", controllerAllRoutes);

export { ROUTER };