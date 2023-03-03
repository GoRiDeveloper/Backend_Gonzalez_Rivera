import {emptyField, alphabeticValidation} from "./validations.js";
import { hashPassword } from "../../../config/password.js";
/**
 * @param {User<Like>} user 
 * @returns {User<Like>}
 */
export default async function userValidation (user) {

    const 

    {

        name,
        lastName,
        email,
        pass

    }                 = user,
    ALPHABETIC_PARAMS = [

        name, 
        lastName

    ];

    emptyUserFieldValidation(user);
    alphabeticValidation(ALPHABETIC_PARAMS);

    const MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email);

    if (!MAIL_REG_EXP) throw `El E-Mail no es valido.`;

    const NEW_PASS = await hashPassword(pass);

    user.pass = NEW_PASS;

    return user;

};

function emptyUserFieldValidation ({name, lastName, user, email, pass}) {

    if (emptyField(name)) 
        throw `El campo ${name}, no puede estar vacío.`;
        
    if (emptyField(lastName)) 
        throw `El campo ${lastName}, no puede estar vacío.`;

    if (emptyField(user)) 
        throw `El campo ${user}, no puede estar vacío.`;

    if (emptyField(email)) 
        throw `El campo ${email}, no puede estar vacío.`;

    if (emptyField(pass)) 
        throw `El campo ${pass}, no puede estar vacío.`;

};