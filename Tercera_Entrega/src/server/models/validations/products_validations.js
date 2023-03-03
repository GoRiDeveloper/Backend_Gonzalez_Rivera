import {emptyField, alphabeticValidation, itsNumber, imgValidation} from "./validations.js";
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

    if (NEW_PRICE === NaN) throw "El Precio debe ser un número.";

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
        prod.price = NEW_PRICE;

    };
    if (STOCK) {

        const NEW_STOCK = stockValidation(STOCK);
        prod.stock = NEW_STOCK;
    
    };

    return prod;

};

function stockValidation (stock) {

    if (!stock) throw "El Stock no puede estar vacío.";

    itsNumber(stock);

    const NEW_STOCK = parseInt(stock);

    if (NEW_STOCK === NaN) throw "El Stock debe ser un número.";

    return NEW_STOCK;

};

function emptyProdFieldValidation ({name, description, img}) {

    if (emptyField(name)) throw `El campo ${name}, no puede estar vacío.`;
    if (emptyField(description)) throw `El campo ${description}, no puede estar vacío.`;
    if (emptyField(img))throw `El campo ${img}, no puede estar vacío.`;

};