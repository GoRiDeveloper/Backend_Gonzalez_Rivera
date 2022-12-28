import { containerCarts } from "./switch_containers.js";
import { PERSISTENCE } from "../../config/config.js";
import {

    productValidation,
    createCart,
    addProduct

} from "../../../functions/functions.js";

class ContainerCarts {

    constructor () {

        this.container = containerCarts;

    };

    async getCarts () {

        const DATA = await this.container.getAll();

        if (!DATA) return null;

        return DATA;

    };

    async getCart (id) {

        const CART = await this.container.getOne(id);

        if (!CART) return CART; 

        return CART;

    };

    async postCart () {

        const MODEL = createCart(),
               CART = await this.container.save(MODEL);

        if (!CART) return null;

        return CART;

    };

    async emptyCart (id) {

        let exists;
        const DATA = await this.getCarts(),
                DB = PERSISTENCE === "mongodb";

        if (!DATA) return DATA;

        DB
            ? exists = DATA.find(items => items._id === id)
            : exists = DATA.find(items => items.id === id);

        if (!exists) return exists;

        let cart = createCart();

        DB
            ? cart._id = id
            : cart.id = id;

        if (DB) delete cart.id;

        const EMPTY = await this.container.updateOne(cart);

        if (!EMPTY) return EMPTY;

        return EMPTY;

    };

    async addProductToCart (prod, id) {

        const PROD = productValidation(prod),
              CART = await this.getCart(id);

        if (!CART) return CART;

        const ADD_PRODUCT = await addProduct(PROD, CART),
              UPDATE_CART = await this.container.updateOne(ADD_PRODUCT);

        if (!UPDATE_CART) return UPDATE_CART;

        return UPDATE_CART;

    };

    async deleteProductToCart (cartID, prodID) {

        const CART = await this.getCart(cartID),
                DB = PERSISTENCE === "mongodb";

        if (!CART) return CART;

        const { products } = CART;

        if (products.length < 1) return null;

        const INDEX = products.findIndex(items => items.id === prodID);

        if (INDEX === undefined || INDEX === -1) return INDEX;

        const ERASED = await products.splice(INDEX, 1),
         UPDATE_CART = await this.container.updateOne(CART);

        if (!UPDATE_CART) return UPDATE_CART;

        return ERASED;

    };

};

export const CARTS = new ContainerCarts();