import { randomUUID as generateID } from "crypto";

export default class Task {

    constructor (desc) {

        this.id = generateID();
        this.desc = desc;
        this.filled = null;

    };

};