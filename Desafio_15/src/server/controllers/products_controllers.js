import { PRODS } from "../containers/container_products.js";
import ErrIDNotFound from "../errors/error_id_not_found.js";
import ErrorSave from "../errors/error_save.js";

async function controllerGetProducts ({ query }, res) {

    let result;
    const PRODUCTS = await PRODS.getProds();

    query.min || query.max
        ? result = PRODUCTS.filter(({ price }) => PRODS.range(price, query.min, query.max))
        : result = PRODUCTS;
    
    res.status(200).json(result);

};

async function controllerGetProduct ({ params: { id } }, res) {

    if (!id.trim()) throw new ErrIDNotFound(id);

    const PRODUCT = await PRODS_ROUTER.getProd(id.trim());
    res.status(200).json(PRODUCT);

};

async function controllerPostProduct ({ body }, res) {

    if (!body) throw new ErrorSave(body);

    const ADD_PRODUCT = await PRODS.addProd(body);
    res.status(201).json(ADD_PRODUCT);

};

async function controllerPutProduct ({body, params: { id }}, res) {

    if (!id.trim()) throw new ErrIDNotFound(id);
    if (!body) throw new ErrorSave(body);

    const UPDATE_PRODUCT = await PRODS.updatedProd(id.trim(), body);
    res.status(200).json(UPDATE_PRODUCT);

};

async function controllerPatchProduct ({body, params: { id }}, res) {

    if (!id.trim()) throw new ErrIDNotFound(id);
    if (!body) throw new ErrorSave(body);

    const UPDATE_PRODUCT = await PRODS.updatedProdData(id.trim(), body);
    res.status(200).json(UPDATE_PRODUCT);

};

async function controllerDeleteProduct ({ params: { id } }, res) {

    if (!id.trim()) throw new ErrIDNotFound(id);

    const DELETE_PRODUCT = await PRODS.deleteProd(id.trim());
    res.status(200).json(DELETE_PRODUCT);

};

export {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerPatchProduct,
    controllerDeleteProduct

};