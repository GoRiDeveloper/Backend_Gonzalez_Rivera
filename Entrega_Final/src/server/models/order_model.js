import { createId } from "../utils/create_id.js";
import { getDate } from "../utils/get_date.js";
import { OrderDTO } from "../dtos/order_dto.js";

export class Order {

    #id;
    #date;
    #idUser;
    #prods;

    constructor ({

        id   = createId(), 
        date = getDate(),
        idUser, 
        prods

    }) {

        this.#id     = id;
        this.#date   = date;
        this.#idUser = idUser;
        this.#prods  = prods;

    };

    asDto () {

        return new OrderDTO({

            id: this.#id,
            date: this.#date,
            idUser: this.#idUser,
            products: this.#prods

        });

    };

};