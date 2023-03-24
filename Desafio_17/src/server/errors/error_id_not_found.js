export default class ErrorIDNotFound extends Error {

    constructor (id) {
        super(`No se encontró la información con el ID : ${id}.`);
        this.type = "NO_SE_ENCONTRO_EL_ID";
    };

};