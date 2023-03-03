import { Server } from "http";
import { APP } from "../../app.js";

export class ContainerServer {

    #server

    constructor () {

        this.#server = new Server(APP);

    };
/**
 * @param {Number} port 
 */
    async connect (port) {

        if (!port) throw `Se necesita un puerto.`;

        return new Promise((res, rej) => {

            this.#server = this.#server.listen(port, () => res({ port }));
            this.#server.on("error", err => rej(err));

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