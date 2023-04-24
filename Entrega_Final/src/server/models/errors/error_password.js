export default class ErrorPassword extends Error {

    constructor () {

        super ("Wrong password.");
        this.type = "WRONG_PASS";

    };

};