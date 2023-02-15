import configureSocket from "../socket/config.js";
import { Server } from "http";
import { APP } from "../../app.js";

export class ContainerServer {

    #server

    constructor () {

        this.#server = new Server(APP);

    };

    async connect (port = 0) {

        return new Promise ((res, rej) => {

            this.#server = this.#server.listen(port, () => {

                configureSocket(this.#server);
                res({ port });

            });

            this.#server.on("error", err => {

                rej(err);

            });

        });

    };

    async disconect () {

        return new Promise((res, rej) => {

            HTTP_SERVER.close(err => {

                err

                    ? rej(err)
                    : res(true);

            });

        });

    };

};