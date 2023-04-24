export default class ErrorSendEmail extends Error {

    constructor () {

        super("Could not send email.");
        this.type = "FAIL_SEND";

    };

};