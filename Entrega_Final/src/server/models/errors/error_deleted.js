export default class ErrorDelete extends Error {

    constructor (id) {

        super(`Not delete, ID : "${id}".`);
        this.type = "NOT_DELETE";

    };

};