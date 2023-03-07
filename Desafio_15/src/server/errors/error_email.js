export default class ErrorEmail extends Error {

    constructor () {
        super("El E-Mail no es válido.");
        this.type = "EMAIL_INVALIDO";
    };

};