import { emptyField, alphabeticValidation } from "./validations.js";
import { validationError } from "../error_model.js";
import { hashPassword } from "../../../config/password.js";

export default async function userValidation (user) {

    const 
    
    { 

        name, 
        lastname,
        email, 
        password 

    } = user,
    ALPHABETIC_PARAMS = [

        name,
        lastname

    ];

    emptyUserFieldValidation(user);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email);

    if (!MAIL_REG_EXP)
        throw validationError(email);

    const NEW_PASS = await hashPassword(password);

    user.password = NEW_PASS;

    const USER = {

        ...user

    };

    return USER;

};

function emptyUserFieldValidation({ name, lastname, username, email, password }) {

    if (emptyField(name))
        throw validationError(name);

    if (emptyField(lastname))
        throw validationError(lastname);

    if (emptyField(username))
        throw validationError(username);

    if (emptyField(email))
        throw validationError(email);

    if (emptyField(password))
        throw validationError(password);

};