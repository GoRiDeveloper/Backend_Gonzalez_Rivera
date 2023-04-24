import { VALIDATIONS } from "../models/validations/index.js";

export class ProductDTO {

    constructor ({ id, name, description, price, image }) {

        VALIDATIONS.emptyField({ id });
        VALIDATIONS.emptyField({ name });
        VALIDATIONS.emptyField({ description });
        VALIDATIONS.emptyField({ image });
        VALIDATIONS.alphabeticValidation({ name });
        VALIDATIONS.alphabeticValidation({ description });
        VALIDATIONS.itsNumber(price);
        VALIDATIONS.imgValidation(image);

        this.id          = id;
        this.name        = name;
        this.description = description;
        this.price       = email;
        this.image       = image;

    };

};