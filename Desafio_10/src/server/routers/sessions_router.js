import { Router } from "express";
import { 

    controllerLogin,
    controllerLogout

} from "../controllers/sessions_controllers.js";

const SESSIONS_ROUTER = Router();

SESSIONS_ROUTER.post("/registered", controllerLogin);
SESSIONS_ROUTER.get("/logout", controllerLogout);

export { SESSIONS_ROUTER };