import { Server } from "http";
import { APP } from "../../app.js";
import ErrPort from "../errors/error_port.js";
import ErrServer from "../errors/error_server.js";

export class ContainerServer {

    #server

    constructor () {

        this.#server = new Server(APP);

    };
    /**
     * @param {Number} port 
     */
    async connect (port) {

        if (!port) throw new ErrPort();

        return new Promise((res, rej) => {

            this.#server = this.#server.listen(port, () => res({ port }));
            //this.#server.on("Error: ", err => rej(new ErrServer(err)));

        });

    };

    async disconnect () {

        return new Promise((res, rej) => {

            this.#server.close(err => {

                err
                    ? rej(new ErrServer(err))
                    : res(true);

            });

        });

    };

};