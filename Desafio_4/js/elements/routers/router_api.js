const express = require("express"),
{

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

} = require("../controllers/controllers_api.js");

const routerApi = express.Router();

routerApi.get("/", controllerGetProducts);
routerApi.get("/:id", controllerGetProduct);
routerApi.post("/", controllerPostProduct);
routerApi.put("/:id", controllerPutProduct);
routerApi.delete("/:id", controllerDeleteProduct);

module.exports = {

    routerApi

};