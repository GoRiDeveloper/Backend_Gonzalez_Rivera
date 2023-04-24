import { createId } from "../utils/create_id.js";
import { getKey, getValue } from "../utils/object_utils.js";
import { VALIDATIONS } from "./validations/index.js";
import { ProductDTO } from "../dtos/product_dto.js";
import ErrNumber from "./errors/error_number.js";

export class Product {

    #id;
    #name;
    #desc;
    #price;
    #image;

    static updateValidation (prod) {

        const

        NAME  = prod.name        && { name: prod.name },
        DESC  = prod.description && { description: prod.description },
        PRICE = prod.price       && { price: prod.price},
        IMAGE = prod.img         && prod.image;

        if (IMAGE) VALIDATIONS.imgValidation(IMAGE);
        if (NAME) { 

            VALIDATIONS.emptyField(NAME);
            VALIDATIONS.alphabeticValidation(NAME);

        };
        if (DESC) { 

            VALIDATIONS.emptyField(DESC);
            VALIDATIONS.alphabeticValidation(DESC);

        };
        if (PRICE) {

            const 
            
            KEY   = getKey(PRICE, 0),
            VALUE = getValue(PRICE, 0);

            VALIDATIONS.itsNumber(PRICE);
    
            const NEW_PRICE = parseFloat(VALUE);
    
            if (NEW_PRICE === NaN) throw new ErrNumber(KEY);
    
            prod.price = VALUE;
    
        };

        return prod;


    };

    constructor ({

        id = createId(),
        name,
        description,
        price,
        image = "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg"

    }) {

        this.#id    = id;
        this.#name  = name;
        this.#desc  = description;
        this.#price = price;
        this.#image = image;

    };

    asDto () {

        return new ProductDTO({

            id: this.#id,
            name: this.#name,
            description: this.#desc,
            price: this.#price,
            image: this.#image

        });

    };

};