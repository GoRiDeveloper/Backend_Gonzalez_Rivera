import session from "express-session";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { engine } from "express-handlebars";
import express, { json, urlencoded, static as Static } from "express";
import { CONFIG_SESSION } from "./persistence/files/sessions/config_sessions.js";
import { handleSocket } from "./server/functions/functions.js";
import { ROUTER } from "./server/routers/router.js";
import { SESSIONS_ROUTER } from "./server/routers/sessions_router.js";
import { PRODUCTS_ROUTER } from "./server/routers/products_router.js";
import { MESSAGES_ROUTER } from "./server/routers/messages_router.js";

const 

APP         = express(),
HTTP_SERVER = new HttpServer(APP),
IO          = new IOServer(HTTP_SERVER);

APP.use(json());
APP.use(urlencoded({ extended: true }));
APP.use(session(CONFIG_SESSION));
APP.use(Static("public"));

APP.use("/", ROUTER);
APP.use("/sessions", SESSIONS_ROUTER);
APP.use("/products", PRODUCTS_ROUTER);
APP.use("/messages", MESSAGES_ROUTER);
APP.use("*", (req, res) => {

    res.send("Ruta no implementada");

});

APP.set("views", "./src/server/views");
APP.engine(".hbs", engine({

    extname: ".hbs"

}));
APP.set("view engine", "hbs");

IO.on("connection", socket => {

    handleSocket(socket, IO.sockets);

});

export const SERVER_CONECT = (port = 0) => {

    return new Promise((res, rej) => {

        const SERVER_CONECTED = HTTP_SERVER.listen(port, () => {

            res(SERVER_CONECTED);

        });
        SERVER_CONECTED.on("ERROR :", err => rej(err));

    });

};