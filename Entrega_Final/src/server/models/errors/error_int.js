export default class ErrorInt extends Error {

    constructor (key) {

        super (`Int invalid : ${key}.`);
        this.type = "INT_INVALID";

    };

};