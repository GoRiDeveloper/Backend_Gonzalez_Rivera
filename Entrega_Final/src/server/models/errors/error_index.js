export default class ErrorIndex extends Error {

    constructor () {

        super ("The index does not exist in the object you sent.");
        this.type = "INVALID_INDEX";

    };

};