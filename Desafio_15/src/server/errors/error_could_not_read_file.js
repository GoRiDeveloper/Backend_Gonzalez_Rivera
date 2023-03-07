export default class ErrorCouldNotReadFile extends Error {

    constructor () {
        super("No se pudo leer este archivo.");
        this.type = "NO_SE_PUDO_LEER_EL_ARCHIVO";
    };

};