import { Product } from "../../models/product_model.js";

export class ProductService {

    #productDao;

    constructor (productDao) {

        this.#productDao = productDao;

    };

    async getAllProducts (queries) {

        const PRODS = await this.#productDao.getProducts(queries);
        return PRODS;

    };

    async getProductById (id) {

        const PROD = await this.#productDao.getProduct(id);
        return PROD;

    };

    async saveProduct (product) {

        const 
        
        PROD    = new Product(product),
        PROD_DTO = PROD.asDto(),
        ADD_PROD = await this.#productDao.addProduct(PROD_DTO);

        return ADD_PROD;

    };

    async updateProductById (id, productToUpdate) {

        productToUpdate.id = id;

        const

        NEW_PROD    = new Product(productToUpdate),
        PROD_DTO    = NEW_PROD.asDto(),
        UPDATE_PROD = await this.#productDao.updateProduct(id, PROD_DTO);

        return UPDATE_PROD;

    };

    async updateProductDataById (id, dataToUpdate) {

        const 

        NEW_PROD    = new Product.updateValidation(dataToUpdate),
        UPDATE_PROD = await this.#productDao.updateProductData(id, NEW_PROD);

        return UPDATE_PROD;

    };

    async deleteProductById (id) {

        return await this.#productDao.deleteProduct(id);

    };

};