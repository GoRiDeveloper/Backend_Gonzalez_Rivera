export default class ErrorObject extends Error {

    constructor () {

        super ("The received parameter is not an object.");
        this.type = "NOT_AN_OBJECT";

    };

};