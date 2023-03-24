export default class ErrorPort extends Error {

    constructor () {
        super("Se necesita un puerto para conectar el servidor.");
        this.type = "SE_NECESITA_UN_PUERTO";
    };

};