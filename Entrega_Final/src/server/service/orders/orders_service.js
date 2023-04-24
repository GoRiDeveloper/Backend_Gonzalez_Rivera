import { SHOPPING_CART_SERVICE } from "../shopping_cart/index.js";
import { Order } from "../../models/order_model.js";
import { EMAIL_DAO } from "../../daos/persistence/factory.js";
import ErrIDNotFound from "../../models/errors/error_id_not_found.js";

export class OrderService {

    #orderDao;

    constructor (orderDao) {

        this.#orderDao = orderDao;

    };

    async createNewOrder (idUser, emailUser) {

        const 

        CART      = await SHOPPING_CART_SERVICE.getCartProductsInfo(idUser),
        PRODS     = CART.products,
        NEW_ORDER = new Order({ idUser, products: PRODS }),
        ORDER_DTO = NEW_ORDER.asDto();
        
        await SHOPPING_CART_SERVICE.emptyCart(CART);
        await EMAIL_DAO.sendOrderEmails(PRODS, emailUser);

        return await this.#orderDao.saveNewOrder(ORDER_DTO);

    };

    async getPurchaseOrdersFromUser (idUser) {

        if (!idUser || !idUser.trim()) throw new ErrIDNotFound(ID);

        const QUERY = { idUser };

        return await this.#orderDao.getOrdersFromUser(QUERY);

    };

};