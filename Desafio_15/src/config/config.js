import { config } from "dotenv";

config({ path: ".env" });

export const CONFIG = {

    mode: process.env.MODE,
    port: parseInt(process.env.PORT),
    cnxStr: process.env.CNX_STR_REMOTE,
    dbName: process.env.DB_NAME,
    persistence: process.env.PERSISTENCE,
    secret: process.env.SECRET,
    collections: {

        users: process.env.COLLECTION_USERS,
        products: process.env.COLLECTION_PRODUCTS,
        carts: process.env.COLLECTION_CARTS,
        shopping: process.env.COLLECTION_SHOPPING

    },
    collectionsLocal: {

        users: process.env.LOCAL_USERS,
        products: process.env.LOCAL_PRODUCTS,
        carts: process.env.LOCAL_CARTS,
        shopping: process.env.LOCAL_SHOPPING

    },
    configMail: {

        host: "smtp.gmail.com",
        port: 587,
        auth: {
    
            user: "alancaminante1515@gmail.com",
            pass: "123"
    
        }
    
    }

};

export const persistence = CONFIG.persistence === "mongodb";