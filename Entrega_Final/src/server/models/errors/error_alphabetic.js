export default class ErrorAlphabetic extends Error {

    constructor () {

        super ("Must be alphabetic.");
        this.type = "MUST_BE_ALPHABETIC";

    };

};