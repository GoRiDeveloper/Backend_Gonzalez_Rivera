import express, { json, urlencoded, static as Static } from "express";
import cookieParser from "cookie-parser";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { handleSocket } from "./functions/server_functions/server_functions.js";
import { HBS } from "./server/middleware/handlebars.js"
import { SESSION } from "./server/middleware/session.js";
import { PASSPORT, PASSPORT_SESSION } from "./server/middleware/passport.js";
import { ROUTER } from "./server/routers/router.js";
import { PRODUCTS_ROUTER } from "./server/routers/products_router.js";
import { MESSAGES_ROUTER } from "./server/routers/messages_router.js";
import { API_ROUTER } from "./server/routers/api_router.js";

const

APP         = express(),
HTTP_SERVER = new HttpServer(APP),
IO          = new IOServer(HTTP_SERVER);

APP.use(json());
APP.use(urlencoded({ extended: true }));
APP.use(Static("public"));
APP.use(cookieParser());
APP.use(SESSION);
APP.use(PASSPORT);
APP.use(PASSPORT_SESSION);

APP.set("views", "./src/views");
APP.set("view engine", ".hbs");

APP.engine(".hbs", HBS);

APP.use("/products", PRODUCTS_ROUTER);
APP.use("/messages", MESSAGES_ROUTER);
APP.use("/api", API_ROUTER);
APP.use("/", ROUTER);

IO.on("connection", socket => handleSocket(socket, IO.sockets));

export const SERVER_CONECT = (port = 0) => {

    return new Promise((res, rej) => {

        const SERVER_CONECTED = HTTP_SERVER.listen(port, () => {

            res(SERVER_CONECTED);

        });
        SERVER_CONECTED.on("ERROR :", err => rej(err));

    });

};