export default class ErrorUserExists extends Error {

    constructor (user) {
        super(`El Usuario : "${user}", ya existe.`);
        this.type = "EL_USUARIO_YA_EXISTE";
    };

};