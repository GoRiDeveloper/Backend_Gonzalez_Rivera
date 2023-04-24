import { createId } from "../utils/create_id.js";
import { ShoppingCartDTO } from "../dtos/shopping_cart_dto.js";

export class ShoppingCart {

    #id;
    #idUser;
    #prods;

    constructor ({ id = createId(), idUser, prods }) {

        this.#id     = id;
        this.#idUser = idUser;
        this.#prods  = prods;

    };

    asDto () {

        return new ShoppingCartDTO({

            id: this.#id,
            idUser: this.#idUser,
            products: this.#prods

        });

    };

};