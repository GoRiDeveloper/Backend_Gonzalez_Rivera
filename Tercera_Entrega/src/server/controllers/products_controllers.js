import { PRODS } from "../containers/container_products.js";

async function controllerGetProducts ({ query }, res) {

    let result;
    const PRODUCTS = await PRODS_ROUTER.getProds();

    if (!PRODUCTS) return res.status(404).json({ Error: "No existen Productos." });

    query.min || query.max
        ? result = PRODUCTS.filter(({ price }) => range(price, query.min, query.max))
        : result = PRODUCTS;
    
    res.status(200).json(result);

};

async function controllerGetProduct ({ params: { id } }, res) {

    if (!id.trim()) throw "Se necesita el ID.";

    const PRODUCT = await PRODS_ROUTER.getProd(id.trim());

    PRODUCT
        ? res.status(200).json(PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id}, no se encontró` });

};

async function controllerPostProduct ({ body }, res) {

    if (!body) throw "Se necesita un Producto para añadir.";

    const ADD_PRODUCT = await PRODS.addProd(body);

    ADD_PRODUCT
        ? res.status(201).json(ADD_PRODUCT)
        : res.status(404).json({ Error: "No se pudo añadir el producto." });

};

async function controllerPutProduct ({body, params: { id }}, res) {

    if (!id || !body) throw "Se necesita el ID y el Producto a Actualizar.";

    const UPDATE_PRODUCT = await PRODS.updatedProd(id.trim(), body);

    UPDATE_PRODUCT
        ? res.status(200).json(UPDATE_PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id}, no se encontró.` });

};

async function controllerPatchProduct ({body, params: { id }}, res) {

    if (!id || !body) throw "Se necesita el ID y Campos para Actualizar.";

    const UPDATE_PRODUCT = await PRODS.updatedProdData(id.trim(), body);

    UPDATE_PRODUCT
        ? res.status(200).json(UPDATE_PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id}, no se encontró.` });

};

async function controllerDeleteProduct ({ params: { id } }, res) {

    if (!id) throw "Se necesita el ID.";

    const DELETE_PRODUCT = await PRODS.deleteProd(id.trim());

    DELETE_PRODUCT
        ? res.status(200).json(DELETE_PRODUCT)
        : res.status(404).json({ Error: `El Producto con el ID : ${id}, no se encontró.` });

};

export {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerPatchProduct,
    controllerDeleteProduct

};