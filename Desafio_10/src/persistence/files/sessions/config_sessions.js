import MongoStore from "connect-mongo";
import { CNX_STR } from "../../config/config.js";

const CONFIG_SESSION = {

    store: MongoStore.create({

        mongoUrl: CNX_STR

    }),
    secret: "mongoKey",
    resave: false,
    saveUninitialized: false,
    cookie: {

        maxAge: 20000

    }

};

export { CONFIG_SESSION };