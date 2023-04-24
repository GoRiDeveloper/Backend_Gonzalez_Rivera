export default class ErrorCouldNotReadFile extends Error {

    constructor () {

        super ("Could not read.");
        this.type = "COULD_NOT_READ";

    };

};