import { PRODUCTS_ROUTER } from "./routers/router_products.js";
import { handleSocket } from "./functions/functions.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io"
import express, { json, urlencoded } from "express";

const APP = express();
const HTTP_SERVER = new HttpServer(APP),
               IO = new IOServer(HTTP_SERVER);

APP.use(json());
APP.use(urlencoded({ extended: true }));
APP.use(express.static("public"));

APP.use("/api/products-test", PRODUCTS_ROUTER);

IO.on("connection", (socket) => {

    handleSocket(socket, IO.sockets);

});

export const SERVER_CONECT = (port = 0) => {

    return new Promise ((res, rej) => {

        const SERVER_CONECTED = HTTP_SERVER.listen(port, () => {

            res(SERVER_CONECTED);

        });
        SERVER_CONECTED.on("ERROR :", err => rej(err));

    });

};