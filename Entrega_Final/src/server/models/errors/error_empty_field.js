export default class ErrorEmptyField extends Error {

    constructor (field) {

        super (`Empty field : "${field}".`);
        this.type = "EMPTY_FIELD";

    };

};