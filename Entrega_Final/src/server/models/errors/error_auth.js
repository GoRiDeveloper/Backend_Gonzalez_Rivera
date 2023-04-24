export default class ErrorAuth extends Error {

    constructor () {

        super ("You are not authenticated.");
        this.type = "NEED_AUTH";

    };

};