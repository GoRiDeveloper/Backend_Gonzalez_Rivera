import { randomUUID as generateID } from "crypto";
import { configID } from "../../../config/config.js";
import { containerProducts } from "../../../persistence/containers/switch_container.js";
import Product from "../../models/products/Product.js";
import Products from "../../models/products/Products.js";

export default class ContainerProducts {

    #container

    constructor () {

        this.#container = containerProducts;

    };

    range (price, min, max) {
    
        return price >= min && price <= max;
    
    };

    async getProds () {

        const PRODS = await this.#container.getAll();
        return new Products(PRODS);

    };
    /**
     * @param {String} id 
     * @returns {Product}
     */
    async getProd (id) {

        const PROD_FIND = await this.#container.getOne(id);
        return new Product(PROD_FIND);

    };

    async addProd (prod) {

        prod.id = generateID();

        const 
        
        PROD   = new Product(prod),
        QUERY  = { name: PROD.getName },
        EXISTS = await this.#container.findByProp(QUERY, { error: false });

        if (EXISTS) {

            const FIND_PROD = new Product(EXISTS);

            FIND_PROD.setStock = 1;

            const 
            
            ID          = configID(FIND_PROD.data()),
            QUERY_STOCK = { stock: FIND_PROD.getStock };

            return await this.updatedProdData(ID, QUERY_STOCK);

        };

        return await this.#container.save(PROD.data());

    };

    async updatedProd (id, updatedToProd) {

        updatedToProd.id = id;

        const NEW_PROD = new Product(updatedToProd);

        return await this.#container.updateOne(id, NEW_PROD);

    };
    
    async updatedProdData (id, updatedToProd) {

        const VALID_UPDATE = Product.updateValidation(updatedToProd);
        return await this.#container.patchOne(id, VALID_UPDATE);

    };

    async deleteProd (id) {

        return await this.#container.deleteOne(id);
        
    };

};