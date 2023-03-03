import { shoppingContainer } from "../../persistence/containers/switch_container.js";
import { CARTS } from "./container_carts.js";

class ShoppingContainer {

    #container

    constructor () {

        this.#container = shoppingContainer;

    };

    async buy () {

        //await CARTS.emptyCart(idCart);

    };

};

export const SHOPPING = new ShoppingContainer();