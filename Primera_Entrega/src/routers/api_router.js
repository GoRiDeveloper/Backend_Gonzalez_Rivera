import { Router } from "express";
import adminAuthorized from "../middleware/sessions.js";
import {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

} from "../controllers/controllers_api.js";

let admin = false;

const routerApi = Router();

routerApi.post("/login", (req, res) => {

    admin = true;
    res.sendStatus(200);

});

routerApi.post("/logout", (req, res) => {

    admin = false;
    res.sendStatus(200);

});

routerApi.get("/", controllerGetProducts);
routerApi.get("/:id", controllerGetProduct);
routerApi.post("/", adminAuthorized, controllerPostProduct);
routerApi.put("/:id", adminAuthorized, controllerPutProduct);
routerApi.delete("/:id", adminAuthorized, controllerDeleteProduct);

export { 

    admin,
    routerApi 

};