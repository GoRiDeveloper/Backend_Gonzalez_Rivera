import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {

    controllerGetMessages,
    controllerPostMessage,
    controllerDeleteMessage

} from "../controllers/messages_controllers.js";

const MESSAGES_ROUTER = Router();

MESSAGES_ROUTER.get("/", isAuthenticated, controllerGetMessages);
MESSAGES_ROUTER.post("/", isAuthenticated, controllerPostMessage);
MESSAGES_ROUTER.delete("/:id", isAuthenticated, controllerDeleteMessage);

export { MESSAGES_ROUTER };