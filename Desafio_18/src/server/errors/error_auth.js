export default class ErrorAuth extends Error {

    constructor () {
        super("No estás Autenticado.");
        this.type = "NECESITAS_AUTENTICARTE";
    };

};