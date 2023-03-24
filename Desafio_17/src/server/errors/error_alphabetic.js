import { getKey } from "../../config/config.js";

export default class ErrorAlphabetic extends Error {

    constructor (item) {
        super(`El campo "${getKey(item, 0)}", debe ser alfabético.`);
        this.type = "DEBE_SER_ALFABÉTICO";
    };

};