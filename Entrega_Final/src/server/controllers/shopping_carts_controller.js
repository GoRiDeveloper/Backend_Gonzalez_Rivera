import { USER_SERVICE } from "../service/user/index.js";
import { SHOPPING_CART_SERVICE } from "../service/shopping_cart/index.js";
import { configId } from "../../config/config.js";

async function controllerGetProductsCart ({ headers }, res) {

    const 

    USER = USER_SERVICE.getDataUser(headers),

    CART = await SHOPPING_CART_SERVICE
                    .getCartProductsInfo(configId(USER));

    res.status(200).json(CART);

};

async function controllerPostProductCart ({ headers, body }, res) {
    
    const USER = USER_SERVICE.getDataUser(headers);
    const USER_ID = configId(USER);
    const ADD_PROD_TO_CART = await SHOPPING_CART_SERVICE
                                    .addNewProdToCart(USER_ID, body);
    
    res.status(201).json(ADD_PROD_TO_CART);

};

async function controllerDeleteProductCart ({ params: { id } }, res) {

    const USER = USER_SERVICE.getDataUser(headers);
    const USER_ID = configId(USER);
    const DELETE_PROD_CART = await SHOPPING_CART_SERVICE
                                    .deleteProdToCart(USER_ID, id);

    res.status(200).json(DELETE_PROD_CART);

};

export {

    controllerGetProductsCart,
    controllerPostProductCart,
    controllerDeleteProductCart

};