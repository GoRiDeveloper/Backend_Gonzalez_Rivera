import { API_ROUTER } from "./routers/router_api.js";
import MSG_ROUTER from "./routers/router_msg.js"
import express, { urlencoded, json } from "express";

const APP = express();

APP.use(json());
APP.use(urlencoded({ extended: true }));

APP.use("/api/products", API_ROUTER);
APP.use("/api/messages", MSG_ROUTER);
APP.use("*", (req, res) => {

    res.status(404).json({ Error: "No implementada." });

});

export default (port = 0) => {

    return new Promise((res, rej) => {

        const serverConected = APP.listen(port, () => {

            res(serverConected);

        });
        serverConected.on("Error :", err => rej(err));
        
    });

};