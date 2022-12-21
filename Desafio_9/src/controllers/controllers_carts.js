import { CARTS } from "../persistence/classes/containers/carts_container.js";

async function controllerPostCart (req, res) {

    const ADD_CART = await CARTS.postCart();

    ADD_CART

        ? res.status(201).json(ADD_CART)
        : res.status(500).json({ Error: "No se pudo crear el carrito." });

};

async function controllerDeleteProductsCart ({ params: { id_cart } }, res) {

    const EMPTY_CART = await CARTS.emptyCart(id_cart);

    EMPTY_CART 

        ? res.status(200).json(EMPTY_CART)
        : res.status(404).json({ Error: `El Carrito con el ID : ${id} no sé encontró.` });

};

async function controllerPostProductIdCart ({ body, params: { id_cart } }, res) {

    const ADD_PRODUCT_TO_CART = await CARTS.addProductToCart(body, id_cart);

    ADD_PRODUCT_TO_CART 

        ? res.status(201).json(ADD_PRODUCT_TO_CART)
        : res.status(500).json({ Error: "No se pudo agregar el Producto al Carrito." });

};

async function controllerGetIdCart ({ params: { id_cart } }, res) {

    const CART = await CARTS.getCart(id_cart);

    CART

        ? CART.products.length > 0

            ? res.status(200).json(CART)
            : res.status(200).json({ Mensaje: `El carrito con el ID : ${id_cart}, esta vacío.`})

        : res.status(404).json({ Error: `El carrito con el ID : ${id_cart}, no existe.` });

};

async function controllerDeleteIdProductCart ({ params: { id_cart, id_prod } }, res) {

    const DELETE_PRODUCT_TO_CART = await CARTS.deleteProductToCart(id_cart, id_prod);

    DELETE_PRODUCT_TO_CART

        ? res.status(200).json(DELETE_PRODUCT_TO_CART)
        : res.status(404).json(

            { Error: `El Producto con el ID : ${id_prod} o el carrito con el ID : ${id_cart}, no sé encontró.` }
            
        );

};

export {

    controllerPostCart,
    controllerDeleteProductsCart,
    controllerPostProductIdCart,
    controllerGetIdCart,
    controllerDeleteIdProductCart

};