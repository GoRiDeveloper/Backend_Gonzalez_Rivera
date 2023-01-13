import { PERSISTENCE } from "../config/config.js";
import { MongoDBContainer } from "./db_containers/mongodb_container.js";
import { FirestoreContainer } from "./db_containers/firestore_container.js";
import { Container } from "./db_containers/container.js";

let 

containerMessages,
containerSession;

switch (PERSISTENCE) {

    case "mongodb":

        containerMessages = new MongoDBContainer("Messages");

    break;

    case "firestore":

        containerMessages = new FirestoreContainer("Messages");

    break;

    default:

        containerMessages = new Container("./src/persistence/files/messages.txt");

    break;

};

export { 

    containerMessages

};