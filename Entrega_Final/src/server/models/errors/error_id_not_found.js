export default class ErrorIDNotFound extends Error {

    constructor (id) {

        super (`Id : "${id || "empty"}" not found.`);
        this.type = "ID_NOT_FOUND";

    };

};