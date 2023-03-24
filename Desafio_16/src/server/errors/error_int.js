export default class ErrorInt extends Error {

    constructor (num) {

        super(`El campo : ${num} debe ser un entero.`);
        this.type = "INT_ERROR";

    };

};