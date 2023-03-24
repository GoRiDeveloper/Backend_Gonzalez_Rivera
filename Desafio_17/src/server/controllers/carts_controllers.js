import CARTS from "../containers/carts/index.js";
import ErrIDNotFound from "../errors/error_id_not_found.js";

async function controllerGetIdCart ({ params: { id_cart } }, res) {

    if (id_cart.trim()) throw new ErrIDNotFound(id);

    const FIND_CART = await CARTS.getCart(id_cart.trim());

    FIND_CART.products.length === 0

        ? res
            .status(200)
            .json({ 
                Message: "El Carrito está vacío.", 
                cart: FIND_CART.data() 
            })
        : res.status(200).json(FIND_CART.data());

};

async function controllerPostCart (req, res) {

    const ADD_CART = await CARTS.postCart();
    res.status(201).json(ADD_CART);

};

async function controllerPostProductIdCart ({ params: {id_prod, id_cart} }, res) {

    if (!id_cart.trim()) throw new ErrIDNotFound(id_cart);
    if (!id_prod.trim()) throw new ErrIDNotFound(id_prod);

    const ADD_PRODUCT_TO_CART = await CARTS.addProductToCart(id_prod.trim(), id_cart.trim());
    res.status(201).json(ADD_PRODUCT_TO_CART);

};

async function controllerDeleteProductsCart ({params: { id_cart }, user}, res) {

    if (id_cart.trim()) throw new ErrIDNotFound(id_cart);

    const EMPTY_CART = await CARTS.emptyCart(id_cart.trim(), user);
    res.status(200).json(EMPTY_CART.data());

};

async function controllerDeleteIdProductCart ({ params: {id_cart, id_prod} }, res) {

    if (!id_cart.trim()) throw new ErrIDNotFound(id_cart);
    if (!id_prod.trim()) throw new ErrIDNotFound(id_prod);

    const DELETE_PRODUCT_TO_CART = await CARTS.deleteProductToCart(id_prod.trim(), id_cart.trim());
    res.status(200).json(DELETE_PRODUCT_TO_CART.data());

};

export {

    controllerGetIdCart,
    controllerPostCart,
    controllerPostProductIdCart,
    controllerDeleteProductsCart,
    controllerDeleteIdProductCart

};