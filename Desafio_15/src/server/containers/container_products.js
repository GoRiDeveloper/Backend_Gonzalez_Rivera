import {randomUUID as generateID} from "crypto";
import {prodValidation, updateValidate} from "../models/validations/products_validations.js";
import { persistence } from "../../config/config.js";
import { containerProducts } from "../../persistence/containers/switch_container.js";

class ContainerProducts {

    #container

    constructor () {

        this.#container = containerProducts;

    };

    range (price, min, max) {
    
        return price >= min && price <= max;
    
    };

    async getProds () {

        return await this.#container.getAll();

    };
    /**
     * @param {String} id 
     * @returns {Promise<ProductLike>}
     */
    async getProd (id) {

        return await this.#container.getOne(id);

    };
    /**
     * @param {<ProductLike>} prod 
     * @returns {<ProductLike>}
     */
    async addProd (prod) {

        const 
        
        VALIDATE_PROD = await prodValidation(prod),
        QUERY_PROD    = {name: VALIDATE_PROD.name},
        VERIFY_PROD   = await this.#container.findByProp(QUERY_PROD);

        if (VERIFY_PROD) {

            VALIDATE_PROD.stock = VALIDATE_PROD.stock + VERIFY_PROD.stock;

            const 
            
            ID = persistence 
                    ? VERIFY_PROD._id 
                    : VERIFY_PROD.id,

            UPDATE_STOCK = {stock: VALIDATE_PROD.stock};

            return await this.updatedProdData(ID, UPDATE_STOCK);

        } else {

            VALIDATE_PROD.id = generateID();
            return await this.#container.save(VALIDATE_PROD);

        };

    };
    /**
     * @param {String} id 
     * @param {Product<Like>} updatedToProd 
     * @returns {Promise<ProductUpdated>}
     */
    async updatedProd (id, updatedToProd) {

        const VALIDATE_UPDATE = await updateValidate(updatedToProd);
        return await this.#container.putOne(id, VALIDATE_UPDATE);

    };
    /**
     * @param {String} id 
     * @param {Product<Like>} updatedToProd 
     * @returns {Promise<ProductUpdated>}
     */
    async updatedProdData (id, updatedToProd) {

        const VALIDATE_UPDATE = updateValidate(updatedToProd);
        return await this.#container.patchOne(id, VALIDATE_UPDATE);
    };

    async deleteProd (id) {

        return await this.#container.deleteOne(id);
        
    };

};

export const PRODS = new ContainerProducts();