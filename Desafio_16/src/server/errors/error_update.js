export default class ErrorUpdate extends Error {

    constructor (id) {
        super(`No se pudo actualizar la información con el ID : ${id}.`);
        this.type = "NO_SE_ACTUALIZO";
    };

};