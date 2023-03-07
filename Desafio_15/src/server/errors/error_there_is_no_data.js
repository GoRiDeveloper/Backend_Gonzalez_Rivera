export default class ErrorThereIsNoData extends Error {

    constructor () {
        super("No se encontraron datos.");
        this.type = "NO_HAY_DATOS";
    };

};