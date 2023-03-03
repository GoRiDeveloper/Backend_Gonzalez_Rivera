import {randomUUID as generateID} from "crypto";
import {prodValidation, updateValidate} from "../models/validations/products_validations.js";
import { persistence } from "../../config/config.js";
import { containerProducts } from "../../persistence/containers/switch_container.js";

class ContainerProducts {

    #container

    constructor () {

        this.#container = containerProducts;

    };

    async getProds () {

        const DATA = await this.#container.getAll();

        if (!DATA) return DATA;

        return DATA;

    };
    /**
     * @param {String} id 
     * @returns {Promise<ProductLike>}
     */
    async getProd (id) {

        const PROD = await this.#container.getOne(id);

        if (!PROD) return PROD;

        return PROD;

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

            UPDATE_STOCK = {stock: VALIDATE_PROD.stock},
            UPDATED_PROD = await this.updatedProdData(ID, UPDATE_STOCK);

            if (!UPDATED_PROD) return UPDATED_PROD;

            return UPDATED_PROD;

        } else {

            VALIDATE_PROD.id = generateID();

            const ADD_PROD = await this.#container.save(VALIDATE_PROD);

            if (!ADD_PROD) return ADD_PROD;

            return ADD_PROD;

        };

    };
    /**
     * @param {String} id 
     * @param {Product<Like>} updatedToProd 
     * @returns {Promise<ProductUpdated>}
     */
    async updatedProd (id, updatedToProd) {

        const 
        
        VALIDATE_UPDATE = await updateValidate(updatedToProd),
        UPDATED_PROD    = await this.#container.putOne(id, VALIDATE_UPDATE);

        if (!UPDATED_PROD) return UPDATED_PROD;

        return UPDATED_PROD;

    };
    /**
     * @param {String} id 
     * @param {Product<Like>} updatedToProd 
     * @returns {Promise<ProductUpdated>}
     */
    async updatedProdData (id, updatedToProd) {

        const 
        
        VALIDATE_UPDATE = updateValidate(updatedToProd),
        UPDATED_PROD = await this.#container.patchOne(id, VALIDATE_UPDATE);

        if (!UPDATED_PROD) return UPDATED_PROD;

        return UPDATED_PROD;

    };

    async deleteProd (id) {

        const ERASE_PROD = await this.#container.deleteOne(id);

        if (!ERASE_PROD) return ERASE_PROD;

        return ERASE_PROD;

    };

};

export const PRODS = new ContainerProducts();