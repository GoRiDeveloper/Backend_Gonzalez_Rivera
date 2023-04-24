export default class ErrorProductAlreadyExists extends Error {

    constructor (name) {

        super (`Product : "${name}", already exists.`);
        this.type = "PRODUCT_ALREADY_EXISTS";

    };

};