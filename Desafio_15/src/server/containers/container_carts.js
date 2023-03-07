import { randomUUID as generateID } from "crypto";
import { containerCarts } from "../../persistence/containers/switch_container.js";
import { persistence } from "../../config/config.js";
import { PRODS } from "./container_products.js";
import { MAIL_SEND } from "../mail/mail_sender.js";
import ErrThereIsNoData from "../errors/error_there_is_no_data.js";

class ContainerCarts {

    #container

    constructor () {

        this.#container = containerCarts;

    };

    configID (element) {

        if (!element) throw new ErrThereIsNoData();
        if (persistence) return element._id;
        return element.id;
        
    };

    createCart () {

        return {

            id: generateID(),
            products: []

        };

    };

    async getCart (idCart) {

        return await this.#container.getOne(idCart);

    };

    async postCart () {

        const CREATE_CART = this.createCart();
        return await this.#container.save(CREATE_CART);

    };

    async addProductToCart (idProd, idCart) {

        let productToAdd = await PRODS.getProd(idProd);

        const 

        CART         = await this.getCart(idCart),
        { products } = CART;

        let existsInCart = products.find(prod => this.configID(prod) === this.configID(productToAdd));

        if (existsInCart) {

            existsInCart.quantity += 1;

            if (persistence) {

                const

                FIELDS_TO_UPDATE = { "products.$[prod].quantity": existsInCart.quantity },
                OPTIONS_UPDATE   = { arrayFilters: [{ "prod._id": { $eq: existsInCart._id } }] };

                return await this.#container.patchOne(this.configID(CART), FIELDS_TO_UPDATE, OPTIONS_UPDATE);

            };

        } else {

            await PRODS.updatedProdData(this.configID(productToAdd), { stock: productToAdd.stock - 1 });

            productToAdd.quantity = 1;
            products.push(productToAdd);
            
            return await this.#container.patchOne(this.configID(CART), { products });

        };

    };

    async emptyCart (idCart, user) {

        const 
        
        CART         = await this.getCart(idCart),
        { products } = CART;

        if (!products.length > 0) {

            const 
            
            mailOptions = {

                from: "Pedido Realizado",
                to: "alancaminante1515@gmail.com",
                subject: "Nuevo Pedido",
                html: `<h1 style='color: green;'>Pedido de : ${user.user} ${user.email}</h1><p>${JSON.stringify(products)}</p>`

            },
            SEND_MAIL = await MAIL_SEND(mailOptions),

            userMailOptions = {

                from: "Pedido Realizado",
                to: user.email,
                subject: "Pedido en Proceso",
                html: `<h1 style='color: green;'>Usuario ${user.user}</h1><p>${JSON.stringify(products)}</p>`

            },
            SEND_MAIL_USER = await MAIL_SEND.send(userMailOptions);

            products = [];

            return await this.#container.patchOne(this.configID(CART), { products });

        };

        return CART;

    };

    async deleteProductToCart (idProd, idCart) {

        let productToErase = await PRODS.getProd(idProd);

        const 
        
        CART         = await this.getCart(idCart),
        { products } = CART;

        let existsInCart = products.findIndex(prod => this.configID(prod) === this.configID(productToErase));

        if (existsInCart) {

            products.splice(existsInCart, 1);
            return await this.#container.patchOne(this.configID(CART), { products });

        };

        return CART;

    };

};

export const CARTS = new ContainerCarts();