import express, { json, urlencoded, static as Static } from "express";
import os from "os";
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

const PROCESSES = os.cpus().length;

export default class Server {

    #server
    #app
    #http_server
    #io

    constructor () {

        this.#app = express();
        this.#http_server = new HttpServer(this.#app);
        this.#io = new IOServer(this.#http_server);

        this.#app.use(json());
        this.#app.use(urlencoded({ extended: true }));
        this.#app.use(Static("public"));
        this.#app.use(cookieParser());
        this.#app.use(SESSION);
        this.#app.use(PASSPORT);
        this.#app.use(PASSPORT_SESSION);

        this.#app.set("views", "./src/views");
        this.#app.set("view engine", ".hbs");

        this.#app.engine(".hbs", HBS);

        this.#app.use("/products", PRODUCTS_ROUTER);
        this.#app.use("/messages", MESSAGES_ROUTER);
        this.#app.use("/api", API_ROUTER);
        this.#app.use("/", ROUTER);

        this.#io.on("connection", socket => handleSocket(socket, this.#io.sockets));

    };

    async connect (port = 0) {

        return new Promise((res, rej) => {

            this.#server = this.#http_server.listen(port, () => {

                res({ port });
                console.log(`Conectado y esuchando el puerto : ${port}. Procesos : ${PROCESSES}.`);

            });
            this.#server.on("error", err => {

                rej(err);

            });

        });

    };

    async disconnect () {

        return new Promise((res, rej) => {

            this.#server.close(err => {

                err

                    ? rej(err)
                    : res(true);

            });

        });

    };

};