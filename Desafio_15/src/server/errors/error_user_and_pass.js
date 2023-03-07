export default class ErrorUserAndPass extends Error {

    constructor () {
        super("El Nombre de Usuario y Contraseña son requeridos.");
        this.type = "SE_NECESITA_USUARIO_Y_CONTRASEÑA";
    };

};