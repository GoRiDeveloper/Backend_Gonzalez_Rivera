import session from "express-session";
import MongoStore from "connect-mongo";
import { DB_NAME, CNX_STR, SECRET } from "../../config/config.js";

export const SESSION = session({

    store: MongoStore.create({

        mongoUrl: CNX_STR,
        dbName: DB_NAME

    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {

        maxAge: 600

    }

});