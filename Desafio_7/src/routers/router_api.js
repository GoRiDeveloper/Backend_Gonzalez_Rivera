import adminAuthorized from "../middlewares/sessions.js";
import {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

} from "../controllers/api_controllers.js";
import createTable from "../../db/models/table_products.js"
import { Router } from "express";

await createTable();

let admin = true;

const API_ROUTER = Router();

API_ROUTER.post("/login", (req, res) => {

    admin = true;
    res.sendStatus(200);

});
API_ROUTER.post("/logout", (req, res) => {

    admin = false;
    res.sendStatus(200);

});

API_ROUTER.get("/", controllerGetProducts);
API_ROUTER.get("/:id", controllerGetProduct);
API_ROUTER.post("/", adminAuthorized, controllerPostProduct);
API_ROUTER.put("/:id", adminAuthorized, controllerPutProduct);
API_ROUTER.delete("/:id", adminAuthorized, controllerDeleteProduct);

export {

    admin,
    API_ROUTER
    
};