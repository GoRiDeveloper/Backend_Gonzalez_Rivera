export default class ErrorPasswordNeeded extends Error {

    constructor () {

        super ("Password needed.");
        this.type = "PASSWORD_NEEDED";
        
    };

};