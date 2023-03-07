import {emptyField, alphabeticValidation} from "./validations.js";
import { hashPassword } from "../../../config/password.js";
import ErrEmail from "../../errors/error_email.js";
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

    if (!MAIL_REG_EXP) throw new ErrEmail();

    const NEW_PASS = await hashPassword(pass);

    user.pass = NEW_PASS;

    return user;

};

function emptyUserFieldValidation ({name, lastName, user, email, pass}) {

    emptyField(name);        
    emptyField(lastName);
    emptyField(user);
    emptyField(email);
    emptyField(pass);

};