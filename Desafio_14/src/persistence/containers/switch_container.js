import { PERSISTENCE } from "../../config/config.js"
import { MongoDBContainer } from "./mongodb_container.js";
import { FirestoreContainer } from "./firestore_container.js";
import { Container } from "./container.js";

let 

containerMessages,
containerUsers;

switch (PERSISTENCE) {

    case "mongodb":

        containerMessages = new MongoDBContainer("Messages");
        containerUsers = new MongoDBContainer("Users");

    break;

    case "firestore":

        containerMessages = new FirestoreContainer("Messages");
        containerUsers = new FirestoreContainer("Users");

    break;

    default:

        containerMessages = new Container("./src/persistence/files/messages.txt");
        containerUsers = new Container("./src/persistence/files/users.txt");

    break;

};

export { 
    
    containerMessages,
    containerUsers

};