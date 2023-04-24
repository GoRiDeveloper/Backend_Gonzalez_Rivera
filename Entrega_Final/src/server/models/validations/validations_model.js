import { ADMIN_DAO } from "../../daos/persistence/factory.js";
import { getKey, getValue } from "../../utils/object_utils.js";
import ErrEmptyField from "../errors/error_empty_field.js";
import ErrEmail from "../errors/error_email.js";
import ErrAlphabetic from "../errors/error_alphabetic.js";
import ErrInt from "../errors/error_int.js";
import ErrNumber from "../errors/error_number.js";
import ErrUrl from "../errors/error_url.js";
import ErrArray from "../errors/error_array.js";

export class Validations {

    emptyField (item) {

        const 
        
        KEY   = getKey(item, 0)
        VALUE = getValue(item, 0);

        if (!VALUE.trim() || VALUE.length < 1)
            throw new ErrEmptyField(KEY);

    };

    emailValidation (email) {

        const REG_EXP =  /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/i.test(email);
        if (!REG_EXP) throw new ErrEmail();

    };

    alphabeticValidation (item) {

        const 
        
        KEY     = getKey(item, 0), 
        VALUE   = getValue(item, 0),
        REG_EXP = /^[a-z\sñáéíóú]+$/g.test(VALUE.toLowerCase());

        if (typeof VALUE !== "string" || !REG_EXP) 
            throw new ErrAlphabetic(KEY);

    };

    intValidation (item) {

        this.itsNumber(item);

        const

        KEY   = getKey(item, 0),
        VALUE = getValue(item, 0);

        if (!(Number.isInteger(parseFloat(VALUE))))
            throw new ErrInt(KEY);

        const NEW_INT = parseInt(VALUE);

        if (NEW_INT === NaN) throw new ErrNumber(KEY);

        return NEW_INT;

    };

    itsNumber (item) {

        const VALUE = getValue(item, 0);
        if (typeof VALUE !== "number") this.emptyField(item);

    };

    imgValidation (img) {

        const IMG_EXP_REG = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(img);
        if (!IMG_EXP_REG) throw new ErrUrl();

    };

    arrayValidation (item) {

        if (!(item instanceof Array)) throw new ErrArray();

    };

    verifyProdToAdd (prod) {

        const { id, quantity } = prod;

        this.emptyField({ id });
        
        const NEW_QTY = this.intValidation({ quantity });

        prod.quantity = NEW_QTY;

        return prod;

    };

    async verifyEmail (email) {

        return await ADMIN_DAO.verifyAdmin(email);

    };

};