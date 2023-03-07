export default class ErrorDelete extends Error {

    constructor (id) {
        super(`No se pudo eliminar la información con el ID : ${id}.`);
        this.type = "NO_SE_ELIMINO";
    };

};