export default class ErrorSave extends Error {

    constructor (obj) {
        super(`No se pudo guardar en la Base de Datos : ${JSON.stringify(obj)}.`);
        this.type = "NO_SE_GUARDO";
    };

};