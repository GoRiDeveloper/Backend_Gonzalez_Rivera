import { CARTS } from "../containers/container_carts.js";

async function controllerGetIdCart ({ params: { id_cart } }, res) {

    if (id_cart.trim()) throw "Se necesita el ID.";

    const CART = await CARTS.getCart(id_cart.trim());

    if (!CART) res.status(404).json({ Error: `No se encontró el carrito con el ID : ${id_cart}.` });
    if (CART) {

        if (CART.products.length === 0) 

            res
                .status(200)
                .json(

                    { Mensaje: `El carrito con el ID : ${id_cart}, esta vacío.` },
                    CART

                );

        res.status(200).json(CART);

    };

};

async function controllerPostCart (req, res) {

    const ADD_CART = await CARTS.postCart();

    ADD_CART
        ? res.status(201).json(ADD_CART)
        : res.status(500).json({ Error: "No se pudo crear el carrito." });

};

async function controllerPostProductIdCart ({ params: {id_prod, id_cart} }, res) {

    if (!id_cart.trim() || !id_prod.trim()) 
        throw "Se necesita el ID del Producto y del Carrito.";

    const ADD_PRODUCT_TO_CART = await CARTS.addProductToCart(id_prod.trim(), id_cart.trim());

    ADD_PRODUCT_TO_CART
        ? res.status(201).json(ADD_PRODUCT_TO_CART)
        : res
            .status(500)
            .json({ 
                Error: 
                `El Producto con el ID : ${id_prod} o el carrito con el ID : ${id_cart}, no sé encontró.` 
            });

};

async function controllerDeleteProductsCart ({params: { id_cart }, user}, res) {

    if (id_cart.trim()) throw "Se necesita el ID";

    const EMPTY_CART = await CARTS.emptyCart(id_cart.trim(), user);

    EMPTY_CART
        ? res.status(200).json(EMPTY_CART)
        : res.status(404).json({ Error: `No se encontró el carrito con el ID : ${id_cart}.` });

};

async function controllerDeleteIdProductCart ({ params: {id_cart, id_prod} }, res) {

    if (!id_cart.trim() || id_prod.trim()) 
        throw "Se necesita el ID del Producto y del Carrito.";

    const DELETE_PRODUCT_TO_CART = await CARTS.deleteProductToCart(id_prod.trim(), id_cart.trim());
    
    DELETE_PRODUCT_TO_CART
        ? res.status(200).json(DELETE_PRODUCT_TO_CART)
        : res.status(404).json({ Error: `El Producto con el ID : ${id_prod} o el carrito con el ID : ${id_cart}, no sé encontró.` });

};

export {

    controllerGetIdCart,
    controllerPostCart,
    controllerPostProductIdCart,
    controllerDeleteProductsCart,
    controllerDeleteIdProductCart

};