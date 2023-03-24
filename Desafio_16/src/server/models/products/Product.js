import Validations from "../validations/index.js";
import ProductDTO from "./dtos/ProductDTO.js";
import ErrEmptyField from "../../errors/error_empty_field.js";
import ErrNumber from "../../errors/error_number.js";

export default class Product {

    #id;
    #name;
    #desc;
    #price;
    #img;
    #stock;

    constructor ({id, name, description, price, img, stock = 1}) {

        const

        ALPHABETIC_PARAMS = [name, description],
        NEW_STOCK         = Product.stockValidation(stock);

        Validations.itsNumber({ price });
        Validations.imgValidation(img);
        Validations.alphabeticValidation(ALPHABETIC_PARAMS);

        const NEW_PRICE = parseFloat(price);

        if (NEW_PRICE === NaN) throw new ErrNumber(price);

        this.#emptyProdFieldValidation(name, description, img);

        this.#id         = id;
        this.#name       = name;
        this.#desc       = description;
        this.#price      = NEW_PRICE;
        this.#img        = img;
        this.#stock      = NEW_STOCK;

    };

    get getName () {

        return this.#name;

    };

    get getStock () {

        return this.#stock;

    };

    /**
     * @param {number} quantity
     */
    set setStock (quantity) {

        this.#stock += quantity;

    };

    #emptyProdFieldValidation (name, desc, img) {
        
        Validations.emptyField({ name });
        Validations.emptyField({ desc });
        Validations.emptyField({ img });
    
    };

    static stockValidation (stock) {

        if (!stock) throw new ErrEmptyField(stock);
        return Validations.intValidation({ stock });
    
    };
    /**
     * @param {Product} prod 
     * @returns {Product}
     */
    static updateValidation (prod) {

        let alphabeticElements = [];

        const

        NAME  = prod.name        && prod.name,
        DESC  = prod.description && prod.description,
        PRICE = prod.price       && prod.price,
        IMG   = prod.img         && prod.img,
        STOCK = prod.stock       && prod.stock;

        if (NAME)         alphabeticElements.push(NAME);
        if (DESC)         alphabeticElements.push(DESC);
        if (NAME || DESC) Validations.alphabeticValidation(alphabeticElements);
        if (IMG)          Validations.imgValidation(IMG);
        if (STOCK)        prod.stock = this.stockValidation(STOCK);
        if (PRICE) {

            Validations.itsNumber({ PRICE });
    
            const NEW_PRICE = parseFloat(PRICE);
    
            if (NEW_PRICE === NaN) throw new ErrNumber(NEW_PRICE);
    
            prod.price = NEW_PRICE;
    
        };

        return prod;

    };

    data () {

        return new ProductDTO({

            id: this.#id,
            name: this.#name,
            description: this.#desc,
            price: this.#price,
            img: this.#img,
            stock: this.#stock

        });

    };

};