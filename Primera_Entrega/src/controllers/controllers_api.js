import { randomUUID } from "crypto";
import Products from "../classes/classes_api.js"

const prods = new Products("./src/files/products.txt");

function range (min, max, price) {

    return price >= min && price <= max;

};

async function controllerGetProducts ({ query }, res) {

    let result;
    const PRODUCTS = await prods.getAll();

    if (PRODUCTS === null) {
        
        res.status(404);
        res.json({ Error: "No existen productos."});

    } else {
        
        if (query.min || query.max) {

            result = PRODUCTS.filter(({ price }) => range(price, query.min, query.max));
    
        } else {
    
            result = PRODUCTS;
    
        };

        res.status(200);
        res.json({result});

    };

};

async function controllerGetProduct ({ params: { id } }, res) {

    const PRODUCT = await prods.getProd(id);

    if (!PRODUCT) {
        
        res.status(404);
        res.json({ Error: `No sé encontró ningún producto con el ID : ${id}`})

    } else {
      
        res.status(200);
        res.json(PRODUCT);
        
    };

};

async function controllerPostProduct ({ body }, res) {

    if (!body.name || !body.description || !body.price || !body.img) {

        res.status(400);
        res.json({ Error: "El producto que intentas guardar tiene algún campo vacío." });
        
    } else {

        const NEW_BODY = {

            id: randomUUID(),
            name: body.name.toLowerCase(),
            ...body, 
            price: parseFloat(body.price)

        };

        const ADD_PRODUCT = await prods.postProd(NEW_BODY);

        if (ADD_PRODUCT) {

            res.status(201);
            res.json(ADD_PRODUCT);

        } else {

            res.status(500);
            res.json({ Error: "No se pudo guardar el producto."});

        };

    };

};

async function controllerPutProduct ({ body, params: { id } }, res) {

    const NEWBODY = {

        id,
        ...body,
        price: parseFloat(body.price)

    };

    const NEWPRODUCT = await prods.putProd(id, NEWBODY);

    if (!NEWPRODUCT) {

        res.status(404);
        res.json({ Error: `No sé encontró ningún producto con el ID : ${id}` });
        
    } else {

        res.status(200);
        res.json(NEWPRODUCT);
        
    };

};

async function controllerDeleteProduct ({ params: { id } }, res) {

    const ERASED = await prods.deleteProd(id);

    if (!ERASED) {

        res.status(404);
        res.json({ Error: `No existen productos con el ID : ${id}` });
        
    } else {

        res.status(200);
        res.json(ERASED);
        
    };

};

export {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

};