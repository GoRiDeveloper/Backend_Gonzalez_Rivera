export default class ErrorServer extends Error {

    constructor (err) {
        super(`El Servidor tuvo un Error : ${err}.`);
        this.type = "ERROR_SERVER";
    };

};