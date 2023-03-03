function emptyField (item) {

    return item.indexOf(" ") === 0;

};

function alphabeticValidation (params) {

    params.forEach(param => {
        
        const 

        NEW_PARAM     = param.toLowerCase(),
        PARAM_REG_EXP = /^[a-zñáéíóú\s]+$/g.test(NEW_PARAM);

        if (!PARAM_REG_EXP) throw `El campo ${param}, debe ser alfabético.`;

    });

};

function intValidation (item) {

    itsNumber(item);

    const NEW_INT = parseInt(item);

    if (NEW_INT === NaN) throw `El campo ${item}, no es un número.`;

    return NEW_INT;

};

function itsNumber (item) {

    if (!typeof item === "number") {

        if (emptyField(item)) throw `El campo ${item}, no puede estar vacío.`;

    };

};

function imgValidation (img) {

    const IMG_EXP_REG = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(img);

    if (!IMG_EXP_REG) throw "La URL de la imágen no es válida.";

};

export {

    emptyField, 
    alphabeticValidation, 
    intValidation,
    itsNumber,
    imgValidation

};