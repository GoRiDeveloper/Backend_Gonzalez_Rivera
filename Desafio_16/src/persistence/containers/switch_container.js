import DaoFile from "./daos/dao_file.js";
import DaoFirestore from "./daos/dao_firestore.js";
import DaoMongoDB from "./daos/dao_mongodb.js";
import { CONFIG } from "../../config/config.js";

const {persistence, collections, collectionsLocal} = CONFIG;

export let containerUsers, containerProducts, containerCarts, shoppingContainer;

switch (persistence) {

    case "mongodb":

        containerUsers    = new DaoMongoDB(collections.users);
        containerProducts = new DaoMongoDB(collections.products);
        containerCarts    = new DaoMongoDB(collections.carts);
        shoppingContainer = new DaoMongoDB(collections.shopping);

    break;

    case "firestore":

        containerUsers    = new DaoFirestore(collections.users);
        containerProducts = new DaoFirestore(collections.products);
        containerCarts    = new DaoFirestore(collections.carts);
        shoppingContainer = new DaoFirestore(collections.shopping);

    break;

    default:

        containerUsers    = new DaoFile(collectionsLocal.users);
        containerProducts = new DaoFile(collectionsLocal.products);
        containerCarts    = new DaoFile(collectionsLocal.carts);
        shoppingContainer = new DaoFile(collectionsLocal.shopping);

    break;

};