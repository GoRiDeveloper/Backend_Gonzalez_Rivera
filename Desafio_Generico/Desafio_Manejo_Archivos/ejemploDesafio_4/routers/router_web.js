const express = require("express"),
{ 

    getRoot, 
    getWelcome, 
    getBye 

} = require("../controllers/controllers_web.js");

const routerWeb = express.Router();
routerWeb.get("/", getRoot);
routerWeb.get("/bienvenida", getWelcome);
routerWeb.get("/despedida", getBye);

exports.routerWeb = routerWeb;