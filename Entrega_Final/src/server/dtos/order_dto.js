import { VALIDATIONS } from "../models/validations/index.js";

export class OrderDTO {

    constructor ({ id, date, idUser, products }) {

        VALIDATIONS.emptyField({ id });
        VALIDATIONS.emptyField({ date });
        VALIDATIONS.emptyField({ idUser });
        VALIDATIONS.emptyField({ products });
        VALIDATIONS.arrayValidation(products);

        this.id       = id;
        this.date     = date;
        this.idUser   = idUser;
        this.products = products;

    };

};