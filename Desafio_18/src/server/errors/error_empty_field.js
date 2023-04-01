export default class ErrorEmptyField extends Error {

    constructor (field) {
        super(`El campo "${field}", no puede estar vacío.`);
        this.type = "CAMPO_VACÍO";
    };

};