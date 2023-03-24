export default class ErrorUrl extends Error {

    constructor () {
        super("La URL no es válida.");
        this.type = "URL_INVALIDA";
    };

};