export default class ErrorNumber extends Error {

    constructor (num) {
        super(`El campo "${num}", debe ser un Número.`);
        this.type = "DEBE_SER_UN_NÚMERO";
    };

};