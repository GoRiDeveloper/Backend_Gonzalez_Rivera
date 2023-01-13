import { Router } from "express";
import { 
    
    controllerGetMessages,
    controllerPostMessage,
    controllerDeleteMessage

} from "../controllers/messages_controllers.js";

const MESSAGES_ROUTER = Router();

MESSAGES_ROUTER.get("/", controllerGetMessages);
MESSAGES_ROUTER.post("/", controllerPostMessage);
MESSAGES_ROUTER.delete("/:id", controllerDeleteMessage);

export { MESSAGES_ROUTER };