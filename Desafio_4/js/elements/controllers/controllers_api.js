const { randomUUID } = require("crypto"),
                  fs = require("fs").promises;

class Container {

    constructor(file) {

        this.file = file;

    };

    async getAll() {

        const data = await fs.readFile(this.file, "utf-8");

        if (!data){

            return null;

        } else {

            const arr = JSON.parse(data);
            return arr;

        };

    };

};

const products = new Container("./elements/files/products.txt"); 

class ApiMethods extends Container {

    constructor (file) {

        super(file);
        this.prods = [];

    };

    async getProd(id) {

        const data = await this.getAll(),
              prod = data.find(item => item.id === id);

        return prod;

    };

    async postProd(prod) {

        this.prods.push({ id: randomUUID(), ...prod });
        await fs.writeFile(this.file, JSON.stringify(this.prods, null, "\t"));

        const data = await this.getAll();

        return data;

    };

    async putProd(modify, id) {

        const data = await this.getAll();

        if (!data) {

            return null;

        } else {

            const prodI = data.findIndex(index => index.id === id);

            if (prodI === -1) {
                
                return null;

            } else {

                this.prods = [];
                this.prods.push(...data);
                this.prods[prodI] = modify;

                await fs.writeFile(this.file, []);
                await fs.writeFile(this.file, JSON.stringify(this.prods, null, "\t"));

                return this.prods[prodI];
                
            };

        };

    };

    async deleteProd(i, data) {

        this.prods = [];
        this.prods.push(...data);

        const deleteProd = this.prods.splice(i, 1);
        
        await fs.writeFile(this.file, JSON.stringify(this.prods, null, "\t"));

        return deleteProd;

    };

};

const methods = new ApiMethods("./elements/files/products.txt"); 

const range = (price, min = 0, max = 1000000) => {

    return price >= min && price <= max;

};

const controllerGetProducts = async ({ query }, res) => {

    let result;
    const getProducts = await products.getAll();

    if (query.min || query.max) {

        result = getProducts.filter(({ price }) => range(price, query.min, query.max));

    } else {

        result = getProducts;

    };

    if (result === null) {

        res.status(404);
        res.json({ mensaje: "No existen productos." });

    } else {
     
        res.json(result);

    };

};

const controllerGetProduct = async ({ params: { id } }, res) => {

    const product = await methods.getProd(id);

    if (!product) {

        res.status(404);
        res.json({ mensaje: `No se encontró ningún Producto con el ID : ${id}`});

    } else {

        res.json(product);

    };

};

const controllerPostProduct = async ({ body }, res) => {

    if (!body.product || !body.price) {
      
        res.status(400);
        res.json({ mensaje: "El objeto que se intenta guardar esta vacío o tiene un campo vacío." });

    } else {

        const newBody = { ...body, price: parseFloat(body.price) },
           addProduct = await methods.postProd(newBody);

        res.json(addProduct);

    };

};

const controllerPutProduct = async ({ body, params: { id } }, res) => {

    const newBody = { id, ...body, price: parseFloat(body.price) },
       newProduct = await methods.putProd(newBody, id);

    if (!newProduct || newProduct === -1) {
        
        res.status(404);
        res.json({ mensaje: `No se encontró ningún Producto con el ID : ${id}` });

    } else {

        res.json(newProduct);
        
    };


};

const controllerDeleteProduct = async ({ params: { id } }, res) => {

    const data = await products.getAll();

    if (!data) {
        
        res.status(404);
        res.json({ mensaje: "No existen Productos." });

    } else {
        
        const prodI = data.findIndex(index => index.id === id);

        if (prodI === -1) {
            
            res.status(404);
            res.json({ mensaje: `No se encontró ningún Producto con el ID : ${id}` });

        } else {
         
            const erased = await methods.deleteProd(prodI, data);
            res.json(erased);
            
        };

    };

};

module.exports = {

    controllerGetProducts,
    controllerGetProduct,
    controllerPostProduct,
    controllerPutProduct,
    controllerDeleteProduct

};