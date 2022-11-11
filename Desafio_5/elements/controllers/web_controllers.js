const { Methods } = require("./Methods.js"),
   { randomUUID } = require("crypto");

const methods = new Methods();

const renderForm = async (res) => {

    res.sendFile("index.html", { root: "./public" });

};

const range = (price, min = 0, max = 1000000) => {

    return price >= min && price <= max;

};

const controllerGetProducts = async ({ query }, res) => {

    let result;
    const products = methods.prods;

    if (query.min || query.max) {
        
        result = products.filter(({ price }) => range(price, query.min, query.max));

    } else {
      
        result = products;
        
    };

    if (result.length === 0) {
        
        res.status(404);
        res.send("No existen Productos.");

    } else {
      
        const data = {

            products,
            boolean: Boolean(products.length > 0)

        };
        res.render("products", data);
        
    };

};

const controllerGetProduct = async ({ params: { id } }, res) => {

    const product = await methods.getProd(id);

    if (!product) {
        
        res.status(404);
        res.send(`Nó se encontró nungún Producto con el ID : ${id}`);

    } else {
      
        const data = {

            product,
            boolean: Boolean(methods.prods.length > 0)

        };
        res.render("products", data);

    };

};

const controllerPostProduct = async ({ body }, res) => {

    if (!body.product || !body.price || !body.thumbnail) {

        res.status(400);
        res.send("No se puede guardar un objeto vacío.");

    } else {

        const newBody = { 

            id: randomUUID(), 
            ...body,
            product: body.product,
            price: parseFloat(body.price)
        
        };

        await methods.postProd(newBody);

        const products = methods.prods;

        const data = {

            products,
            boolean: Boolean(products.length > 0)

        };

        console.log(products);
        res.render("products", data);

    };

};

const controllerPutProduct = async ({ body, params: { id } }, res) => {

    const newBody = { id, ...body, price: parseFloat(body.price) },
       newProduct = await methods.putProd(newBody, id),
         products = methods.prods;

    if (!newProduct || newProduct === -1) {
        
        res.status(404);
        res.send(`No sé encontró ningún Producto con el ID: ${id}`);

    } else {
        
        const data = {

            products,
            boolean: Boolean(methods.prods.length > 0)

        };
        res.render("products", data);

    }

};

const controllerDeleteProduct = async ({ params: { id } }, res) => {

    if (methods.prods.length === 0) {
        
        res.status(404);
        res.send("No existen Productos.");

    } else {
        
        const deleteProd = await methods.deleteProd(id),
                products = methods.prods;

        if (deleteProd === null) {
            
            res.status(404);
            res.send(`No sé encontró un Producto con el ID : ${id}`);

        } else {
          
            const data = {

                products,
                boolean: Boolean(methods.prods.length > 0)

            };
            res.render("products", data);
            
        };

    };

};

module.exports = { 

    renderForm,
    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct

};