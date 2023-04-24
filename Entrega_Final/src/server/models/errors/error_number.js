export default class ErrorNumber extends Error {

    constructor (key) {

        super (`The "${key}" field is not a number.`);
        this.type = "INVALID_NUMBER";

    };

};