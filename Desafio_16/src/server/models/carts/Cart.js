import { randomUUID as generateID } from "crypto";
import ErrIDNotFound from "../../errors/error_id_not_found.js";
import ErrThereIsNoData from "../../errors/error_there_is_no_data.js";
import Product from "../products/Product.js";
import CartDTO from "./dto/CartDTO.js";

export default class Cart {

    #id
    #products

    constructor ({id, products}) {

        if (!id) throw new ErrIDNotFound(id);
        if (!(products instanceof Array)) throw new ErrThereIsNoData();
        
        this.#id = id;
        this.#products = products;

    };

    static createCart () {

        return new Cart({
            id: generateID(),
            products: []
        });

    };

    get getId () {

        return this.#id;

    };

    get getProducts () {

        return this.#products;

    };
    /**
     * @param {Product} obj
     */
    set setProduct (obj) {

        this.#products.push(obj);

    };

    data () {

        return new CartDTO({
            id: this.#id,
            products: this.#products
        });

    };

};