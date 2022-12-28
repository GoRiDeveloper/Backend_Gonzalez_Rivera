import { PERSISTENCE } from "../config/config.js";
import { MongoDBContainer } from "./mongodb_container.js";
import { FirebaseContainer } from "./firebase_container.js";
import { Container } from "./container.js";

let containerMessages;

switch (PERSISTENCE) {

    case "mongodb":

        containerMessages = new MongoDBContainer("Messages");
        
    break;

    case "firebase":

        containerMessages = new FirebaseContainer("Messages");

    break;

    default:

        containerMessages = new Container("./src/files/messages.txt");

    break;

};

export { containerMessages };