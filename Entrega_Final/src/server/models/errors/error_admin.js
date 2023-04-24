export default class ErrorAdmin extends Error {

    constructor () {

        super ("You need administrator permissions.");
        this.type = "YOU_ARE_NOT_ADMIN";

    };

};