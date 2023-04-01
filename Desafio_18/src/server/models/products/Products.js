//import ErrThereIsNoData from "../../errors/error_there_is_no_data.js";
import ErrArray from "../../errors/error_array.js";
import ErrProps from "../../errors/error_props.js";
import ProductsDTO from "./dtos/ProductsDTO.js";

export default class Products {

    #prods;

    constructor (products) {

        if (!products) throw new ErrProps(products);
        if (!(products instanceof Array)) throw new ErrArray();
        //if (products.lenght === 0) throw new ErrThereIsNoData();

        this.#prods = products;

    };

    data() {

        return new ProductsDTO({ products: this.#prods });

    };

};