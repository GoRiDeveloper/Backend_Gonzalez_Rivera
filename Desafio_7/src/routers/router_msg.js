import {

    controllerGetMsg,
    controllerPostMsg,
    controllerDeleteMsg

} from "../controllers/msg_controllers.js";
import createTable from "../../db/models/table_messages.js"
import { Router } from "express";

await createTable();

const MSG_ROUTER = Router();

MSG_ROUTER.get("/", controllerGetMsg);
MSG_ROUTER.post("/", controllerPostMsg);
MSG_ROUTER.delete("/:id", controllerDeleteMsg);

export default MSG_ROUTER;