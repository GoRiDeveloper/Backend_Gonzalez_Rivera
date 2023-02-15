export function validationError (field) {

    const ERROR = new Error(`ERROR: El campo "${field}" no es válido.`);
    ERROR.type = "Error_de_validación";

    return ERROR;

};