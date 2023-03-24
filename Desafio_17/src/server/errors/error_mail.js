export default class ErrorMail extends Error {

    constructor () {
        super("No se envio el correo.");
        this.type = "NO_SE_ENVIO";
    };

};