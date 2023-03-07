import ErrEmptyField from "../../errors/error_empty_field.js";
import ErrAlphabetic from "../../errors/error_alphabetic.js";
import ErrNumber from "../../errors/error_number.js";
import ErrUrl from "../../errors/error_img.js";

function emptyField (item) {

    if (!item.trim() || item.length < 1) throw new ErrEmptyField(item);

};

function alphabeticValidation (params) {

    params.forEach(param => {
        
        const 

        NEW_PARAM     = param.toLowerCase(),
        PARAM_REG_EXP = /^[a-zñáéíóú\s]+$/g.test(NEW_PARAM);

        if (!PARAM_REG_EXP) throw new ErrAlphabetic(NEW_PARAM);

    });

};

function intValidation (item) {

    itsNumber(item);

    const NEW_INT = parseInt(item);

    if (NEW_INT === NaN) throw new ErrNumber(item);

    return NEW_INT;

};

function itsNumber (item) {

    if (!typeof item === "number") emptyField(item);

};

function imgValidation (img) {

    const IMG_EXP_REG = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(img);
    if (!IMG_EXP_REG) throw new ErrUrl();

};

export {

    emptyField, 
    alphabeticValidation, 
    intValidation,
    itsNumber,
    imgValidation

};