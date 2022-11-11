const { 
    
    renderForm,
    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct

} = require("../controllers/web_controllers.js");

const express = require("express"),
    webRouter = express.Router();

webRouter.get("/", renderForm);

webRouter.get("/products", controllerGetProducts);
//webRouter.get("/products/:id", controllerGetProduct);
webRouter.post("/products", controllerPostProduct);

module.exports = { webRouter };