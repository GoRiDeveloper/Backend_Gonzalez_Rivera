import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {

    controllerGetMessages,
    controllerPostMessage,
    controllerDeleteMessage

} from "../controllers/messages_controllers.js";

export const MESSAGES_ROUTER = Router();

MESSAGES_ROUTER.get("/", auth, controllerGetMessages);
MESSAGES_ROUTER.post("/", auth, controllerPostMessage);
MESSAGES_ROUTER.delete("/:id", auth, controllerDeleteMessage);