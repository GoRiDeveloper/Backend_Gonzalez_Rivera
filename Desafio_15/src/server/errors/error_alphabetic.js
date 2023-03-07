export default class ErrorAlphabetic extends Error {

    constructor (item) {
        super(`El campo "${item}", debe ser alfabético.`);
        this.type = "DEBE_SER_ALFABÉTICO";
    };

};