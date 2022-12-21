import { PERSISTENCE } from "../../config/config.js";
import { MongoDBContainer } from "../containers/mongodb_container.js";
import { FirebaseContainer } from "../containers/firebase_container.js";
import { Container } from "../containers/container.js";

let containerProducts;
let containerCarts;

switch (PERSISTENCE) {

    case "mongodb":
    
        containerProducts = new MongoDBContainer("Products");
        containerCarts = new MongoDBContainer("Carts");

    break;

    case "firebase":

        containerProducts = new FirebaseContainer("Products");
        containerCarts = new FirebaseContainer("Carts");

    break;

    default:

        containerProducts = new Container("./src/files/products.txt");
        containerCarts = new Container("./src/files/carts.txt");

    break;

};

export { 

    containerProducts,
    containerCarts

};