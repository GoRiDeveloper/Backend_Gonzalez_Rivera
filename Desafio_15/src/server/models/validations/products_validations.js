import {emptyField, alphabeticValidation, itsNumber, imgValidation} from "./validations.js";
import ErrEmptyField from "../../errors/error_empty_field.js";
import ErrorNumber from "../../errors/error_number.js";
/**
 * @param {Product<Like>} prod 
 * @returns {Product<Like>}
 */
export function prodValidation (prod) {

    const 

    {

        name,
        description, 
        price,
        img,
        stock = 1

    } = prod,
    ALPHABETIC_PARAMS = [name, description],
    NEW_STOCK         = stockValidation(stock);

    emptyProdFieldValidation(prod);
    alphabeticValidation(ALPHABETIC_PARAMS);
    itsNumber(price);
    imgValidation(img);

    const NEW_PRICE = parseFloat(price);

    if (NEW_PRICE === NaN) throw new ErrorNumber(price);

    prod.price = NEW_PRICE;
    prod.stock = NEW_STOCK;

    return prod;

};

export function updateValidate (prod) {

    const

    NAME  = prod.name && prod.name,
    DESC  = prod.description && prod.description,
    PRICE = prod.price && prod.price,
    IMG   = prod.img && prod.img,
    STOCK = prod.stock && prod.stock;

    if (NAME) alphabeticValidation([NAME]);
    if (DESC) alphabeticValidation([DESC]);
    if (IMG) imgValidation(IMG);
    if (PRICE) {

        itsNumber(PRICE);

        const NEW_PRICE = parseFloat(PRICE);

        if (NEW_PRICE === NaN) throw new ErrorNumber(NEW_PRICE);

        prod.price = NEW_PRICE;

    };
    if (STOCK) {

        const NEW_STOCK = stockValidation(STOCK);
        prod.stock = NEW_STOCK;
    
    };

    return prod;

};

function stockValidation (stock) {

    if (!stock) throw new ErrEmptyField(stock);

    itsNumber(stock);

    const NEW_STOCK = parseInt(stock);

    if (NEW_STOCK === NaN) throw new ErrorNumber(NEW_STOCK);

    return NEW_STOCK;

};

function emptyProdFieldValidation ({name, description, img}) {

    emptyField(name);
    emptyField(description);
    emptyField(img);

};