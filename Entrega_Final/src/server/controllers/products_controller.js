import { PROD_SERVICE } from "../service/products/index.js";

async function controllerGetProducts ({ query }, res) {

    const PRODUCTS = await PROD_SERVICE.getAllProducts(query);

    PRODUCTS
        ? res.status(200).json(PRODUCTS)
        : res.status(200).json(PRODUCTS);

};

async function controllerGetProduct ({ params: { id } }, res) {

    const PRODUCT = await PROD_SERVICE.getProductById(id);
    res.status(200).json(PRODUCT);

};

async function controllerPostProduct ({ body }, res) {

    const ADD = await PROD_SERVICE.saveProduct(body);
    res.status(201).json(ADD);

};

async function controllerPutProduct ({ body, params: { id } }, res) {

    const UPDATE = await PROD_SERVICE.updateProductById(id, body);
    res.status(200).json(UPDATE);

};

async function controllerDeleteProduct (req, res) {

    const DELETE = await PROD_SERVICE.deleteProductById(id);
    res.status(200).json(DELETE);

};

export {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct, 
    controllerPutProduct,
    controllerDeleteProduct

};