import {

    controllerGetProducts,
    controllerGetProduct,
    controllerAddProduct,
    controllerUpdateProduct,
    controllerPatchProduct,
    controllerDeleteProduct

} from "../controllers/products_graphql_controller.js";

export const PRODUCTS_RESOLVERS = {

    getProducts: controllerGetProducts,
    getProduct: controllerGetProduct,
    addProduct: controllerAddProduct,
    updateProduct: controllerUpdateProduct,
    updateProductData: controllerPatchProduct,
    deleteProduct: controllerDeleteProduct
    
};