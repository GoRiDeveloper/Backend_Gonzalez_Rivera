const { 

    controllerGetProducts,
    controllerPostProducts

} = require("../controllers/web_controllers");

const express = require("express"),
    webRouter = express.Router();

webRouter.get("/", controllerGetProducts);

webRouter.post("/", controllerPostProducts);

module.exports = { webRouter };