export default class ErrorUrl extends Error {

    constructor () {

        super ("Url invalid.");
        this.type = "URL_INVALID";

    };

};