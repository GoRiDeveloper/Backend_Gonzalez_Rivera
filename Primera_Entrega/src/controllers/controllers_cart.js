import { randomUUID } from "crypto";
import Carts from "../classes/classes_cart.js";

const carts = new Carts("./src/files/carts.txt");

async function controllerPostCart (req, res) {
    
    const CART = {

        id: randomUUID(),
        products: []

    };

    const ADD_CART = carts.postCart(CART);

    if (ADD_CART) {

        res.status(201);
        res.json(ADD_CART);
        
    } else {

        res.status(500);
        res.json({ Error: "No se pudo guardar el carrito" });
        
    };

};

async function controllerDeleteProductsCart ({ params: { id_cart }, res}) {

    const EMPTY_CART = await carts.emptyCart(id_cart);

    if (!EMPTY_CART) {

        res.status(404);
        res.json({ Error: `No se encontró el carrito con el ID : ${id_cart}` });
        
    } else {

        res.status(200);
        res.json(EMPTY_CART);
        
    };

};

async function controllerPostProductIdCart ({ body, params: { id_cart }, res}) {

    if (!body.name || !body.description || !body.price || !body.img) {

        res.status(400);
        res.json({ Error: "El producto que intentas agregar tiene algún campo vacío." });

    } else {

        const NEW_BODY = {

            id: randomUUID(),
            name : body.name.toLowerCase(),
            ...body,
            price: parseFloat(body.price)

        };

        const ADD_PRODUCT_TO_CART = await carts.addProductToCart(id_cart, NEW_BODY);

        if (!ADD_PRODUCT_TO_CART) {

            res.status(500);
            res.json({ Error: `No se pudo guardar el producto en el carrito con el ID : ${id_cart}` });
            
        } else {

            res.status(201);
            res.json(ADD_PRODUCT_TO_CART);
            
        };

    };

};

async function controllerGetIdCart ({ params: { id_cart } }, res) {

    const CART = await carts.getIdCart(id_cart);

    if (CART) {

        const { products } = CART;

        if (products.length > 0) {

            res.status(200);
            res.json(products);
            
        } else {

            res.status(200);
            res.json({ mensaje: `El carrito con el ID : "${id_cart}" esta vacío.` });
            
        };
        
    } else {

        res.status(404);
        res.json({ Error: `No se encontró ningún carrito con el ID : ${id_cart}` });
        
    };

};

async function controllerDeleteIdProduct ({ params: { id_cart, id_prod } }, res) {

    const DELETE_PRODUCT_TO_CART = await carts.deleteProductToCart(id_cart, id_prod);

    if (DELETE_PRODUCT_TO_CART) {

        res.status(200);
        res.json(DELETE_PRODUCT_TO_CART);
        
    } else {

        res.status(404);
        res.json({ Error: `No se encontró el producto con el ID : ${id_prod}` });
        
    };

};

export {

    controllerPostCart,
    controllerDeleteProductsCart,
    controllerPostProductIdCart,
    controllerGetIdCart,
    controllerDeleteIdProduct

};