export default class ErrorUpdate extends Error {

    constructor (id) {

        super (`Not updated, ID : "${id}".`);
        this.type = "NOT_UPDATED";
        
    };

};