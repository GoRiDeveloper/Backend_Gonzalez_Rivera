export default class ErrorSave extends Error {

    constructor (obj) {

        super (`NOT SAVED : ${JSON.stringify(obj) || ""}.`);
        this.type = "NOT_SAVED";

    };

};