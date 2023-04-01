import {mdbPersistence, CONFIG, configID} from "../../../config/config.js";
import { containerCarts } from "../../../persistence/containers/switch_container.js";
import { MAIL_SEND } from "../../mail/mail_sender.js";
import PRODS from "../products/index.js";
import Cart from "../../models/carts/Cart.js";

export default class ContainerCarts {

    #container

    constructor () {

        this.#container = containerCarts;

    };

    async getCart (idCart) {

        const CART_FOUND = await this.#container.getOne(idCart);
        return new Cart(CART_FOUND);

    };

    async postCart () {

        const CREATE_CART = Cart.createCart();
        return await this.#container.save(CREATE_CART.data());

    };

    async addProductToCart (idProd, idCart) {
    
        let 
        
        product      = await PRODS.getProd(idProd),
        productToAdd = product.data();

        const CART = await this.getCart(idCart);

        let existsInCart = CART.getProducts.find(prod => configID(prod) === configID(productToAdd));

        if (existsInCart) {

            existsInCart.quantity += 1;

            let id = configID(CART.data()), fieldsToUpdate, optionsUpdate;

            switch (CONFIG.persistence) {

                case "mongodb":

                    fieldsToUpdate = { 
                        "products.$[prod].quantity": existsInCart.quantity 
                    },
                    optionsUpdate   = { 
                        arrayFilters: [{ "prod._id": { 
                            $eq: existsInCart._id                     
                        }}] 
                    };

                break;

                case "firestore":
                    
                    fieldsToUpdate = {products: FieldValue.arrayRemove(existsInCart)};
                    await this.#container.patchOne(id, fieldsToUpdate);
                    fieldsToUpdate = {};
                    fieldsToUpdate = {products: FieldValue.arrayUnion(existsInCart)};

                default :

                    const 
                    
                    NEW_PRODS = [ ...CART.getProducts ],
                    INDEX     = NEW_PRODS.findIndex(item => item.id === existsInCart.id);

                    NEW_PRODS[INDEX] = existsInCart;

                    fieldsToUpdate = { products: NEW_PRODS };

                break;

            };
            // Mover al Shopping.
            await PRODS
                    .updatedProdData(
                        configID(productToAdd), 
                        { stock: productToAdd.stock - 1 }
                    );
            //
            return await this.#container.patchOne(
                id, 
                fieldsToUpdate, 
                mdbPersistence && optionsUpdate
            );

        } else {
            // Mover al Shopping.            
            await PRODS
                    .updatedProdData(
                        configID(productToAdd), 
                        { stock: productToAdd.stock - 1 }
                    );
            //
            productToAdd.quantity = 1;
            CART.setProduct       = productToAdd;
            
            return await this
                            .#container
                            .patchOne(
                                configID(CART.data()), 
                                { products: CART.getProducts }
                            );

        };

    };

    async emptyCart (idCart, user) {

        const CART = await this.getCart(idCart);

        if (!CART.products.length > 0) {

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

            const CART_UPDATED = await this.#container.patchOne(configID(CART), { products });

            return new Cart(CART_UPDATED);

        };

        return CART;

    };

    async deleteProductToCart (idProd, idCart) {

        let 
        
        product        = await PRODS.getProd(idProd),
        productToErase = product.data();

        const CART = await this.getCart(idCart);

        let 
        
        products     = CART.getProducts;
        existsInCart = products.find(prod => configID(prod) === configID(productToErase));

        if (existsInCart) {

            let id = configID(CART), fieldsToUpdate;

            switch (CONFIG.persistence) {

                case "mongodb":

                    fieldsToUpdate = { $pull: { 
                        "products._id": existsInCart.id 
                    } };

                break;

                case "firestore":
                    fieldsToUpdate = {products: FieldValue.arrayRemove(existsInCart)};
                break;

                default:

                    const INDEX = products.findIndex(prod => configID(prod) === configID(productToErase));
                    products.splice(INDEX, 1);
                    fieldsToUpdate = { products };

                break;

            };

            return await this.#container.patchOne(id, fieldsToUpdate);

        };

        return CART.data();

    };

};