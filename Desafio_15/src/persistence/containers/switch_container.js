import Container from "./container.js";
import FirestoreContainer from "./firestore_container.js";
import MongoDBContainer from "./mongodb_container.js";
import { CONFIG } from "../../config/config.js";

const {persistence, collections, collectionsLocal} = CONFIG;

export let containerUsers, containerProducts, containerCarts, shoppingContainer;

switch (persistence) {

    case "mongodb":

        containerUsers    = new MongoDBContainer(collections.users);
        containerProducts = new MongoDBContainer(collections.products);
        containerCarts    = new MongoDBContainer(collections.carts);
        shoppingContainer = new MongoDBContainer(collections.shopping);

    break;

    case "firestore":

        containerUsers    = new FirestoreContainer(collections.users);
        containerProducts = new FirestoreContainer(collections.products);
        containerCarts    = new FirestoreContainer(collections.carts);
        shoppingContainer = new FirestoreContainer(collections.shopping);

    break;

    default:

        containerUsers    = new Container(collectionsLocal.users);
        containerProducts = new Container(collectionsLocal.products);
        containerCarts    = new Container(collectionsLocal.carts);
        shoppingContainer = new Container(collectionsLocal.shopping);

    break;

};