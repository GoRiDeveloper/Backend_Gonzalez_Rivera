export default class ErrorPasswordParams extends Error {

    constructor () {

        super ("Passwords required.");
        this.type = "PASSWORDS_REQUIRED";

    };

};