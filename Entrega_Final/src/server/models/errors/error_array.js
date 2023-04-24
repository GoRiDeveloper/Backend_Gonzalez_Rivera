export default class ErrorArray extends Error {

    constructor () {

        super ("The received parameter is not an array.");
        this.type = "NOT_AN_ARRAY";

    };

};