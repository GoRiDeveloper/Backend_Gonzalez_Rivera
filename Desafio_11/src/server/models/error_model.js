function authError () {

    const ERROR = new Error("No estás autenticado.");
    ERROR.type = "Error_de_Autenticación"

    return ERROR;

};

function validationError (field) {

    const ERROR = new Error(`ERROR: El campo "${field}" no es válido.`);
    ERROR.type = "Error_de_validación";

    return ERROR;

};

export { validationError, authError };