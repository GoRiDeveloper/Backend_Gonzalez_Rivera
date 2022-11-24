import express, { urlencoded, json } from "express";
import { routerApi } from "./routers/api_router.js";
import routerCart from "./routers/cart_router.js";

const APP = express();

APP.use(json());
APP.use(urlencoded({ extended: true }));

APP.use("/api/products", routerApi);
APP.use("/api/shoppingcart", routerCart);

APP.all("*", (req, res) => {

    res.status(404).json({ Error : "No implementada" });

});

const serverConect = (port = 0) => {

    return new Promise ((res, rej) => {

        const serverConected = APP.listen(port, () => {

            res(serverConected);

        });
        serverConected.on("Error :", err => rej(err));

    });

};

export default serverConect;