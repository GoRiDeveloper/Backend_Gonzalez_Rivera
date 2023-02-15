import { alphabeticValidation, emptyField, intValidation } from "./validations.js";
import { validationError } from "../error_model.js";

export default function msgValidation (msg) {

    const

    { author } = msg,
    {

        name,
        lastname,
        email,
        age,
        avatar

    } = author,
    
    ALPHABETIC_PARAMS = [

        name,
        lastname

    ];

    emptyMsgFieldValidation(msg);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const

    NEW_AGE      = intValidation(age),
    MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email),
    IMG_REG_EXP  = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(avatar);

    if (!MAIL_REG_EXP)
        throw validationError(email);

    if (!IMG_REG_EXP)
        throw validationError(avatar);

    msg.author.age = NEW_AGE;

    const MSG = {

        ...msg

    };

    return MSG;

};

function emptyMsgFieldValidation ({ author: { email, name, lastname, alias }, message }) {

    if (emptyField(email))
        throw validationError(email);

    if (emptyField(name))
        throw validationError(name);

    if (emptyField(lastname))
        throw validationError(lastname);

    if (emptyField(alias))
        throw validationError(alias);

    if (emptyField(message))
        throw validationError(message);

};