export default class ErrorCouldNotGet extends Error {

    constructor () {

        super("Could not get info.");
        this.type = "COULD_NOT_GET_INFO";

    };

};