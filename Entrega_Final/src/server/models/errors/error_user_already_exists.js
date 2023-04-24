export default class ErrorUserAlreadyExists extends Error {

    constructor (email) {

        super (`User : "${email}", already exists.`);
        this.type = "USER_ALREADY_EXISTS";

    };

};