import { PRODS } from "../persistence/classes/containers/prods_container.js"
import { range } from "../functions/functions.js"

function controllerAllPath (req, res) {

    res.status(404).json({ Error: "No implementada." });

};

async function controllerGetProducts ({ query }, res) {

    let result;
    const PRODUCTS = await PRODS.getProds();

    if (!PRODUCTS) return res.status(404).json({ Error: "No existen productos." });
    
    query.min || query.max

        ? result = PRODUCTS.filter(({ price }) => range(price, query.min, query.max)) 
        : result = PRODUCTS;

    res.status(200).json(result);

};

async function controllerGetProduct ({ params: { id } }, res) {

    const PRODUCT = await PRODS.getProd(id.trim());

    PRODUCT 

        ? res.status(200).json(PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id} no sé encontró.`});

};

async function controllerPostProduct ({ body }, res) {

    const ADD_PRODUCT = await PRODS.postProd(body);

    ADD_PRODUCT 

        ? res.status(201).json(ADD_PRODUCT)
        : res.status(409).json({ Error: "No se pudo guardar el producto. "});

};

async function controllerPutProduct ({ body, params: { id } }, res) {

    const UPDATE_PRODUCT = await PRODS.putProd(id.trim(), body);

    UPDATE_PRODUCT 
    
        ? res.status(200).json(UPDATE_PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id} no sé encontró.`});

};

async function controllerDeleteProduct ({ params: { id } }, res) {

    const DELETE_PRODUCT = await PRODS.deleteProd(id.trim());

    DELETE_PRODUCT 
    
        ? res.status(200).json(DELETE_PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id} no sé encontró.`});

};

export {

    controllerAllPath,
    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

};