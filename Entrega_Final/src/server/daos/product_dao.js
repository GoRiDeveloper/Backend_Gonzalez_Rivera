import { range } from "../utils/range.js";
import { getKey, getValue } from "../utils/object_utils.js";
import ErrCouldNotGet from "../models/errors/error_could_not_get.js";
import ErrIDNotFound from "../models/errors/error_id_not_found.js";
import ErrProductAlreadyExists from "../models/errors/error_product_already_exists.js"

export class ProductDAO {

    #persistence;

    constructor (daoPersistence) {

        this.#persistence = daoPersistence;

    };

    async getProducts (queries) {

        let result;
        const PRODS = await this.#persistence.getAll();

        queries.min || queries.max

            ? result = PRODS.filter(({ price }) => range(price, queries.min, queries.max))
            : result = PRODS;
        
        if (!result) throw new ErrCouldNotGet();

        return result;

    };

    async getProduct (id) {

        const ID = id.trim();

        if (!ID) throw new ErrIDNotFound(ID);

        return await this.#persistence.getOne(id)

    };

    async findByProp (prop, error) {

        const

        KEY   = getKey(prop, 0),
        VALUE = getValue(prop, 0),
        QUERY = { [KEY]: VALUE };

        return await this.#persistence.findByProp(QUERY, { filter: false, error });

    };

    async addProduct (product) {

        const 
        
        QUERY_PROP = { name: product.name },
        EXISTS     = await this.findByProp(
            QUERY_PROP, 
            { error: false }
        );

        if (EXISTS) throw new ErrProductAlreadyExists();

        return await this.#persistence.save(product);

    };

    async updateProduct (id, productToUpdate) {

        const ID = id.trim();

        if (!ID) throw new ErrIDNotFound(ID);

        return await this.#persistence.updateOne(ID, productToUpdate);

    };

    async updateProductData (id, productToUpdate) {

        const ID = id.trim();

        if (!ID) throw new ErrIDNotFound(ID);

        return await this.#persistence.patchOne(ID, productToUpdate);

    };

    async deleteProduct (id) {

        const ID = id.trim();

        if (!ID) throw new ErrIDNotFound(ID);

        return await this.#persistence.deleteOne(ID);

    };

};