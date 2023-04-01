import ErrEmptyField from "../../errors/error_empty_field.js";
import ErrAlphabetic from "../../errors/error_alphabetic.js";
import ErrNumber from "../../errors/error_number.js";
import ErrEmail from "../../errors/error_email.js";
import ErrInt from "../../errors/error_int.js";
import ErrUrl from "../../errors/error_img.js";
import {getKey, getValue} from "../../../config/config.js";

export default class Validations {

    emptyField (item) {

        const VALUE = getValue(item, 0);

        if (!VALUE.trim() || VALUE.length < 1) 
            throw new ErrEmptyField(getKey(item));
    
    };

    emailValidation (email) {
        
        const MAIL_REG_EXP = /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email);

        if (!MAIL_REG_EXP) throw new ErrEmail();

    };

    alphabeticValidation (params) {

        params.forEach(param => {

            const 
    
            NEW_PARAM     = param.toLowerCase(),
            PARAM_REG_EXP = /^[a-z\sñáéíóú]+$/g.test(NEW_PARAM);
    
            if (!PARAM_REG_EXP) throw new ErrAlphabetic(NEW_PARAM);
    
        });
    
    };

    intValidation (item) {

        this.itsNumber(item);

        const VALUE = getValue(item, 0);

        if (!(Number.isInteger(parseFloat(VALUE)))) 
            throw new ErrInt(getKey(item));

        const NEW_INT = parseInt(VALUE);
    
        if (NEW_INT === NaN) throw new ErrNumber(item);
    
        return NEW_INT;
    
    };

    itsNumber (item) {

        if (!(typeof getValue(item, 0) === "number")) this.emptyField(item);
    
    };

    imgValidation (img) {

        const IMG_EXP_REG = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(img);
        if (!IMG_EXP_REG) throw new ErrUrl();
    
    };

};