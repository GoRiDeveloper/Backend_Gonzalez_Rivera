import PRODUCTS_ROUTER from "./routers/router_products.js";
import CARTS_ROUTER from "./routers/router_carts.js";
import { controllerAllPath } from "./controllers/controllers_products.js"
import express, {json, urlencoded} from "express";

const APP = express();

APP.use(json());
APP.use(urlencoded({ extended: true }));

APP.use("/api/products", PRODUCTS_ROUTER);
APP.use("/api/carts", CARTS_ROUTER);
APP.use("*", controllerAllPath);

export default (port = 0) => {

    return new Promise((res, rej) => {

        const SERVER_CONECTED = APP.listen(port, () => {

            res(SERVER_CONECTED);

        });
        SERVER_CONECTED.on("ERROR :", err => rej(err));

    });

};