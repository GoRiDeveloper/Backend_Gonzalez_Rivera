import { getKey } from "../../config/config.js";

export default class ErrorNumber extends Error {

    constructor (num) {
        super(`El campo "${getKey(num, 0)}", debe ser un Número.`);
        this.type = "DEBE_SER_UN_NÚMERO";
    };

};