import PRODS from "../containers/products/index.js";

async function controllerGetProducts () {

    const PRODUCTS = await PRODS.getProds();
    return PRODUCTS.data().products;
    
};

async function controllerGetProduct ({ id }) {

    const PRODUCT = await PRODS.getProd(id.trim());
    return await PRODUCT.data();

};

async function controllerAddProduct ({ input }) {

    return await PRODS.addProd(input);

};

async function controllerUpdateProduct ({ id, input }) {

    return await PRODS.updatedProd(id.trim(), input);

};

async function controllerPatchProduct ({ id, input }) {

    return await PRODS.updatedProdData(id.trim(), input);

};

async function controllerDeleteProduct ({ id }) {

    const DELETE = PRODS.deleteProd(id.trim());
    return await DELETE.data();

};

export {

    controllerGetProducts,
    controllerGetProduct,
    controllerAddProduct,
    controllerUpdateProduct,
    controllerPatchProduct,
    controllerDeleteProduct

};