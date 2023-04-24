export default class ErrorEmail extends Error {

    constructor () {

        super ("E-mail invalid.");
        this.type = "EMAIL_INVALID";

    };

};