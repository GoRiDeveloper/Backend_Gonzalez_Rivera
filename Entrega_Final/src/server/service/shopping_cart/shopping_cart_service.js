import { ShoppingCart } from "../../models/shopping_cart_model.js";
import { PROD_SERVICE } from "../products/index.js";
import { VALIDATIONS } from "../../models/validations/index.js";
import { configId } from "../../../config/config.js";
import ErrIdNotFound from "../../models/errors/error_id_not_found.js";

export class ShoppingCartService {

    #shoppingCartDao;

    constructor (shoppingCartDao) {

        this.#shoppingCartDao = shoppingCartDao;

    };

    async getCartProductsInfo (idUser) {

        const CART = await this.findCartByUserId(idUser);
        return await this.#shoppingCartDao.getCartProducts(CART);

    };

    async findCartByUserId (idUser) {

        if (!idUser || !idUser.trim()) 
            throw new ErrIdNotFound(idUser);
        
        const CART = await this.#shoppingCartDao
                                .findByShoppingCartProp(

                                    { idUser }, 
                                    { error: false }

                                );

        if (!CART) throw new ErrIdNotFound(idUser);

        return CART;

    };

    async addNewCart (idUser) {

        const 
        
        NEW_CART = new ShoppingCart({ 

            idUser, 
            prods: [] 
            
        }),
        CART     = NEW_CART.asDto();

        await this.#shoppingCartDao
                    .addShoppingCart(CART);

    };

    async addNewProdToCart (idUser, prodToAdd) {

        const CART = await this.findCartByUserId(idUser);

        prodToAdd = VALIDATIONS
                        .verifyProdToAdd(prodToAdd);

        const 
        
        ID_PROD = configId(prodToAdd),
        PROD    = await PROD_SERVICE.getProductById(ID_PROD);

        if (!PROD) throw new ErrIdNotFound(ID_PROD);
        
        return await this.#shoppingCartDao
                            .addProductToShoppingCart(
                                CART,
                                prodToAdd        
                            );

    };

    async deleteProdToCart (idUser, idProd) {

        const 
        
        ID_PROD = idProd.trim(),
        CART    = await this.findCartByUserId(idUser);

        if (!ID_PROD) throw new ErrIdNotFound(ID_PROD);

        return await this
                        .#shoppingCartDao
                        .deleteProductFromShoppingCart(CART, ID_PROD);

    };

    async emptyCart (shoppingCart) {

        await this.#shoppingCartDao.emptyShoppingCart(shoppingCart);

    };

};