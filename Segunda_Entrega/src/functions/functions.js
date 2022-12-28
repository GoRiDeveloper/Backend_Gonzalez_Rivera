import { randomUUID } from "crypto";
import { PERSISTENCE } from "../persistence/config/config.js";

function range (price, min, max) {
    
    return price >= min && price <= max;

};

function asObj (ref) {

    const OBJ = {

        id: ref.id,
        ...ref.data()

    };
    
    return OBJ;

};

function verifyExists (prods, prod) {

    let newStock;

    const NAME_MATCH = prods.some(item => item.name === prod.name),
          DESC_MATCH = prods.some(item => item.description === prod.description),
         PRICE_MATCH = prods.some(item => item.price === prod.price);

    if (NAME_MATCH && DESC_MATCH && PRICE_MATCH) {

        prod.stock 

            ? newStock = stockValidation(prod.stock) 
            : newStock = 1;

        if (newStock) {
    
            let newID;
            const PROD = prods.find(item => item.name === prod.name);

            if (PERSISTENCE === "mongodb") {

                const { _id } = PROD;

                _id === undefined
                    ? newID = PROD.id
                    : newID = _id;

            } else {

                const { id } = PROD;
                newID = id;

            };

            if (newID) {

                const { stock } = PROD,
                    NEW_STOCK = stock + newStock,
                        ITEM = {

                            id: newID,
                            stock: NEW_STOCK
                
                        };

                return ITEM;

            }; 

        } else {

            return null;

        };

    };

};

function productValidation ({ name, description, price, img, stock = 1 }) {

    const NEW_STOCK = stockValidation(stock);

    emptyFieldValidation(name, description, price, img);
    alphabeticValidation(name);
    itsNumber(price);

    const NEW_PRICE = parseFloat(price);

    if (NEW_PRICE === NaN) 
        throw new Error("Error del Producto : El Precio debe ser un número");

    const IMG_EXP_REG = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig.test(img);

    if (!IMG_EXP_REG) 
        throw new Error("Error del Producto : La URL de la imágen no es válida.");

    const NEW_PROD = {

        id: randomUUID(),
        name,
        description,
        price: NEW_PRICE,
        img,
        stock: NEW_STOCK

    };

    return NEW_PROD;

};

function stockValidation (stock) {

    if (!stock) 
        throw new Error("Error del Producto : El Stock no puede ser un campo vacío.");

    itsNumber(stock);

    const NEW_STOCK = parseInt(stock);

    if (NEW_STOCK === NaN)
        throw new Error("Error del Producto : El Stock debe ser un número.");

    return NEW_STOCK;

};

function itsNumber(item) {

    if (!typeof item === "number") {

        if (emptyField(item))
            throw new Error(`Error del Producto : El ${item} no puede ser un campo vacío.`);

    };

};

function emptyField(item) {

    return item.indexOf(" ") === 0;
    
};

function emptyFieldValidation (name, desc, price, img) {

    if (!name || emptyField(name))
        throw new Error("Error del Producto : El Nombre no puede estar vacío.");

    if (!desc || emptyField(desc))
        throw new Error("Error del Producto : La Descripción no puede estar vacía.");

    if (!price)
        throw new Error("Error del Producto : El Precio no puede estar vacío.");

    if (!img || emptyField(img))
        throw new Error("Error del Producto : El URL de la imágen no puede estar vacío.");

};

function alphabeticValidation (name) {

    const NEW_NAME = name.toLowerCase(),
      NAME_EXP_REG = /^[a-zñáéíóú\s]+$/g.test(NEW_NAME);

    if (!NAME_EXP_REG) 
        throw new Error("Error del Producto : El Nombre sólo puede contener létras.");

};

function updateValidation (prod) {

    let newPrice,
        newStock;

    if (!prod.price && !prod.stock) return prod;

    if (prod.price) {

        itsNumber(prod.price);
        newPrice = parseFloat(prod.price);

    };

    if (prod.stock) newStock = stockValidation(prod.stock);

    if (prod.price) {

        if (!prod.stock) {

            const NEW_PROD = {

                ...prod,
                price: newPrice

            };

            return NEW_PROD;

        };

    };

    if (prod.stock) {

        if (!prod.price) {

            const NEW_PROD = {

                ...prod,
                stock: newStock

            };

            return NEW_PROD;

        };

    };

    if (prod.stock && prod.price) {

        const NEW_PROD = {

            ...prod,
            price: newPrice,
            stock: newStock

        };

        return NEW_PROD;

    };

};

function createCart () {

    const CART = {

        id: randomUUID(),
        products: []

    };

    return CART;

};

async function addProduct (prod, cart) {

    let exists;
    const { products } = cart;
    const DB = PERSISTENCE === "mongodb";

    if (products.length > 0) exists = verifyExists(products, prod);

    if (exists) {

        prod.stock = exists.stock;

        const NEW_PROD = productValidation(prod);

        NEW_PROD.id = exists.id;

        const INDEX = products.findIndex(items => items.id === NEW_PROD.id);

        await products.splice(INDEX, 1);
        await products.push(NEW_PROD);

        return cart;

    } else {

        await products.push(prod);

        if (products.length === 0) return null;

        return cart;

    };

};

export {

    range,
    asObj,
    verifyExists,
    productValidation,
    updateValidation,
    createCart,
    addProduct

};