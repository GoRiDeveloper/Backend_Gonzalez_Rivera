export default class ErrorDB extends Error {

    constructor (e) {

        super (`There was an error trying to connect to the database due to error : "${e}".`);
        this.type = "ERROR_CONNECTING_DATABASE";

    };

};