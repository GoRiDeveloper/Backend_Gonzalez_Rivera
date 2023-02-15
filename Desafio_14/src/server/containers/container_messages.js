import { randomUUID as generateID } from "crypto";
import { containerMessages } from "../../persistence/containers/switch_container.js";
import msgValidation from "../models/validations/messages_validation.js";

class ContainerMessages {

    #container

    constructor () {

        this.#container = containerMessages;

    };

    async getMsgs () {

        const DATA = await this.#container.getAll();

        if (!DATA) return DATA;

        return DATA;

    };

    async postMsg (msg) {

        const MESSAGE = await msgValidation(msg);

        MESSAGE.id = generateID();
        MESSAGE.date = new Date().toLocaleString();

        const ADD_MESSAGE = await this.#container.save(MESSAGE);

        if (!ADD_MESSAGE) return ADD_MESSAGE;

        return ADD_MESSAGE;

    };

    async deleteMsg (id) {

        const ERASE_MSG = await this.#container.deleteOne(id.trim());

        if (!ERASE_MSG) return ERASE_MSG;

        return ERASE_MSG;

    };

};

export const MESSAGES = new ContainerMessages();