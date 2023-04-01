export default class ErrorPasswordNeeded extends Error {

    constructor () {
        super("Se necesita una contraseña.");
        this.type = "SE_NECESITA_UNA_CONTRASEÑA";
    };

};