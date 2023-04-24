import { PROD_SERVICE } from "../service/products/index.js";
import { getKey, getValue } from "../utils/object_utils.js";
import { CONFIG, DEFAULT_MODE, configId } from "../../config/config.js";
import ErrIDNotFound from "../models/errors/error_id_not_found.js";

export class ShoppingCartDAO {

    #persistence;

    constructor (daoPersistence) {

        this.#persistence = daoPersistence;

    };

    async getShoppingCart (id) {

        const ID = id.trim();

        if (!ID) throw new ErrIDNotFound(ID);

        return await this.#persistence.getOne(id);

    };

    async getCartProducts (shoppingCart) {

        let newProds = [];
        const { products } = shoppingCart;

        products.forEach(prod => {
            
            let newProd = PROD_SERVICE
                            .getProductById(
                                configId(prod)
                            );
            
            newProd.quantity = prod.quantity;

            newProds.push(newProd);

        });

        shoppingCart.products = newProds;

    };

    async addShoppingCart (shoppingCart) {

        await this.#persistence.save(shoppingCart);

    };

    async addProductToShoppingCart (shoppingCart, productToAdd) {

        const EXISTS = shoppingCart
                            .products
                            .find(
                                prod => 
                                    configId(prod) === configId(productToAdd)
                            );

        if (EXISTS) {

            let id = configId(shoppingCart), fieldsToUpdate, optionsUpdate;

            switch (CONFIG.mode) {

                case "development" || "production":

                    const NEW_QTY = productToAdd.quantity + EXISTS.quantity;

                    fieldsToUpdate = {
                        "products.$[prod].quantity": NEW_QTY
                    };
                    optionsUpdate = {

                        arrayFilters: [{
                            "prod._id": {
                                $eq: EXISTS._id
                            }
                        }]

                    };

                break;

                default:

                    const 

                    NEW_PRODS = [ ...shoppingCart.products ],
                    INDEX     = NEW_PRODS.findIndex(item => item.id === EXISTS.id);

                    EXISTS.quantity = EXISTS.quantity + productToAdd.quantity;
                    NEW_PRODS[INDEX] = EXISTS;

                    fieldsToUpdate = { products: NEW_PRODS };

                break;

            };

            await this.#persistence
                        .patchOne(

                            id,
                            fieldsToUpdate, 
                            !DEFAULT_MODE && optionsUpdate

                        );
        } else {

            const { products } = shoppingCart;

            products.push(productToAdd);

            return await this.#persistence
                                .updateOne(
                                    id,
                                    { products }
                                );

        };

    };

    async findByShoppingCartProp (prop, error) {

        const

        KEY   = getKey(prop, 0),
        VALUE = getValue(prop, 0),
        QUERY = { [KEY]: VALUE };

        return await this.#persistence.findByProp(QUERY, { filter: false, error });

    };

    async deleteProductFromShoppingCart (shoppingCart, idProd) {

        const EXISTS = shoppingCart
                        .products
                        .find(
                            prod =>
                                configId(prod) === idProd
                        );

        if (!EXISTS) throw new ErrIDNotFound(idProd);

        let id = configId(shoppingCart), fieldsToUpdate;

        switch (CONFIG.mode) {

            case "development" || "production":

                fieldsToUpdate = { 
                    $pull: {
                        "products._id": EXISTS._id
                    }
                };

                return await this
                                .#persistence
                                .deleteOne(
                                    id,
                                    fieldsToUpdate
                                );

            break;

            default:

                const 
                    
                { products } = shoppingCart,
                INDEX = products.findIndex(prod => prod.id === idProd);

                products.splice(INDEX, 1);

                fieldsToUpdate = { products };

                return await this
                                .#persistence
                                .patchOne(
                                    id,
                                    fieldsToUpdate
                                );

            break;

        };

    };

    async emptyShoppingCart (shoppingCart) {

        let id = configId(shoppingCart), fieldsToUpdate;

        switch (CONFIG.mode) {

            case "development" || "production":

                fieldsToUpdate = { products: [] };

            break;

            default:
            
                const { products } = shoppingCart;
                
                products.length = 0;

                fieldsToUpdate = { products };

            break;

        };

        await this.#persistence
                    .patchOne(
                        id,
                        fieldsToUpdate
                    );

    };

};