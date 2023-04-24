import mdb from "../../../config/clients/mongo_client/mongo_client.js";
import { CONFIG } from "../../../config/config.js";
import { MongoDBDao } from "./mongo_db_dao.js";
import { FileDao } from "./file_dao.js";
import { AdminDAO } from "../admin_dao.js";
import { UserDAO } from "../user_dao.js";
import { ProductDAO } from "../product_dao.js";
import { ShoppingCartDAO } from "../shopping_cart_dao.js";
import { OrderDAO } from "../order_dao.js";
import { EmailDAO } from "../email_dao.js";

const { mode, collections, files } = CONFIG;

let

containerAdmin,
containerUsers, 
containerProducts, 
containerShoppingCarts,
containerOrders;

switch (mode) {

    case "production" || "development":

        containerAdmin = new MongoDBDao({
            client: mdb,
            collection: collections.admin
        });

        containerUsers = new MongoDBDao({
            client: mdb, 
            collection: collections.users 
        });

        containerProducts = new MongoDBDao({
            client: mdb, 
            collection: collections.products
        });

        containerShoppingCarts = new MongoDBDao({
            client: mdb, 
            collection: collections.shoppingCarts 
        });

        containerOrders = new MongoDBDao({
            client: mdb, 
            collection: collections.orders 
        });

    break;
    
    default:

        containerAdmin         = new FileDao(files.admin);
        containerUsers         = new FileDao(files.users);
        containerProducts      = new FileDao(files.products);
        containerShoppingCarts = new FileDao(files.shoppingCarts);
        containerOrders        = new FileDao(files.orders);

    break;

};

export const 

    USER_DAO          = containerUsers         && new UserDAO(containerUsers),
    PROD_DAO          = containerProducts      && new ProductDAO(containerProducts),
    SHOPPING_CART_DAO = containerShoppingCarts && new ShoppingCartDAO(containerShoppingCarts),
    ORDER_DAO         = containerOrders        && new OrderDAO(containerOrders),
    ADMIN_DAO         = containerAdmin         && new AdminDAO(containerAdmin),
    EMAIL_DAO         = new EmailDAO(CONFIG.configEmail);