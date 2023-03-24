export default class ErrorArray extends Error {

    constructor () {

        super(`El dato no es un Array.`);
        this.type = "ARRAY_ERROR";

    };

};