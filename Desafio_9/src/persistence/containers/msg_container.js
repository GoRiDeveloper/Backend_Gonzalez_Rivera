import { containerMessages } from "./switch_container.js";

class ContainerMSG {

    #container

    constructor () {

        this.#container = containerMessages;

    };

    async getAllMSG () {

        const MESSAGES = await this.#container.getAll();

        if (!MESSAGES) return null;

        return MESSAGES;

    };

    async getMSG (id) {};

    async sendMSG (msg) {

        const SEND_MSG = await this.#container.save(msg);

        if (!SEND_MSG) return null;

        return SEND_MSG;

    };

    async editMSG (id, msg) {};

    async deleteMSG (id) {};

};

const MSG = new ContainerMSG();

export { MSG };