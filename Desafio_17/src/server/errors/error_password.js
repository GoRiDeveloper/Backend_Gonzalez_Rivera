export default class ErrorPassword extends Error {

    constructor () {
        super("Contraseña invalida.");
        this.type = "CONTRASEÑA_INCORRECTA";
    };

};