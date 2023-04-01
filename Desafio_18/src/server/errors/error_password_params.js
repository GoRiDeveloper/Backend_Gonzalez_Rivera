export default class ErrorPasswordParams extends Error {

    constructor () {
        super("Se necesita la contraseña y la contraseña encriptada.");
        this.type = "SE_NECESITAN_DOS_CONTRASEÑAS";
    };

};