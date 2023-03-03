import session from "express-session";
import MongoStore from "connect-mongo";
import { CONFIG } from "../../config/config.js";

export default session({

    store : MongoStore.create({

        mongoUrl: CONFIG.cnxStr,
        dbName: CONFIG.dbName

    }),
    secret: CONFIG.secret,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {

        maxAge: 180000

    }

});