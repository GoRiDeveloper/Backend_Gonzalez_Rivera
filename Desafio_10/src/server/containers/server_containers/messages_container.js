import { randomUUID as generateID } from "crypto";
import { msgValidation } from "../../functions/functions.js";
import { containerMessages } from "../../../persistence/containers/switch_container.js";

class MessagesContainer {

    constructor () {

        this.container = containerMessages;

    };

    async getMsgs () {

        const DATA = await this.container.getAll();

        if (!DATA) return DATA;

        return DATA;

    };

    async postMsg (msg) {

        const MESSAGE = await msgValidation(msg);

        MESSAGE.id = generateID();
        MESSAGE.date = new Date().toLocaleString();

        const ADD_MESSAGE = await this.container.save(MESSAGE);

        if (!ADD_MESSAGE) return ADD_MESSAGE;

        return ADD_MESSAGE;

    };

    async deleteMsg (id) {

        const MESSAGES = await this.container.getAll();

        if (!MESSAGES) return MESSAGES;

        const ERASE_MESSAGE = await this.container.deleteOne(id);

        if (!ERASE_MESSAGE) return ERASE_MESSAGE;

        return ERASE_MESSAGE;

    };

};

export const MESSAGES = new MessagesContainer();