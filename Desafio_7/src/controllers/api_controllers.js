import { prods } from "../classes/classe_api.js"
import { randomUUID } from "crypto";

function range (min, max, price) {

    return price >= min && price <= max;

};

async function controllerGetProducts ({ query }, res) {

    let result;
    const PRODUCTS = await prods.getAll();

    if (PRODUCTS === null) {

        res.status(404);
        res.json({ Error: "No existen productos"});
        
    } else {

        if (query.min || query.max) {

            result = PRODUCTS.filter(({ price }) => range(query.min, query.max, price));
            
        } else {

            result = PRODUCTS;
            
        };

        res.status(200);
        res.json(result);
        
    };

};

async function controllerGetProduct ({ params : { id } }, res) {

    const PRODUCT = await prods.getProd(id);

    if (!PRODUCT) {

        res.status(404);
        res.json({ Error: `No sé encontró ningún Producto con el ID : ${id}`});
        
    } else {

        res.status(200);
        res.json(PRODUCT);
        
    };

};

async function controllerPostProduct ({ body }, res) {

    if (!body.name || !body.description || !body.price || !body.img || !body.stock) {

        res.status(400);
        res.json({ Error: "El Producto que intentas guardar tiene algún campo vacío." });
        
    } else {

        const NEW_BODY = {

            id: randomUUID(),
            ...body,
            price: parseFloat(body.price)

        };

        const ADD_PRODUCT = await prods.postProd(NEW_BODY);

        if (ADD_PRODUCT) {

            res.status(201);
            res.json(ADD_PRODUCT);
            
        } else {

            res.status(500);
            res.json({ Error: "No se pudo guardar el Producto." });
            
        };
        
    };

};

async function controllerPutProduct ({ body, params : { id } }, res) {

    const NEW_BODY = {

        id,
        body

    };

    const NEW_PRODUCT= await prods.putProd(NEW_BODY);

    if (!NEW_PRODUCT) {

        res.status(404);
        res.json({ Error: `No sé encontró ningún Producto con el ID : ${id}` });
        
    } else {

        res.status(202);
        res.json(NEW_PRODUCT);
        
    };

};

async function controllerDeleteProduct ({ params : { id } }, res) {

    const ERASED = await prods.deleteProd(id);

    if (!ERASED) {

        res.status(404);
        res.json({ Error : `No sé encontró ningún Producto con el ID : ${id}` });
        
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