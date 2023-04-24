import { VALIDATIONS } from "../models/validations/index.js";

export class ShoppingCartDTO {

    constructor({ id, idUser, products }) {

        VALIDATIONS.emptyField({ id });
        VALIDATIONS.emptyField({ idUser });
        VALIDATIONS.arrayValidation(products);

        this.id       = id;
        this.idUser   = idUser;
        this.products = products;

    };

};