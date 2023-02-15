import { validationError } from "../error_model.js";

function emptyField (item) {

    return item.indexOf(" ") === 0;

};

function alphabeticValidation (params) {

    params.forEach(param => {
        
        const

        NEW_PARAM     = param.toLowerCase(),
        PARAM_REG_EXP = /^[a-zñáéíóú\s]+$/g.test(NEW_PARAM);

        if (!PARAM_REG_EXP)
            throw validationError(param);

    });

};

function intValidation (item) {

    itsNumber(item);

    const NEW_INT = parseInt(item);

    if (NEW_INT === NaN)
        throw validationError(item);

    return NEW_INT;

};

function itsNumber (item) {

    if (!typeof item === "number") {
        
        if (emptyField(item))
            throw validationError(item);

    };

};

export {

    emptyField,
    alphabeticValidation,
    intValidation

};