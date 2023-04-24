import { config } from "dotenv";

config({ path: ".env" });

const 

CONFIG = {

    mode:              process.env.MODE,
    port:              parseInt(process.env.PORT),
    cnxStrDev:         process.env.CNX_STR_LOCAL,
    cnxStrProd:        process.env.CNX_STR_REMOTE,
    dbName:            process.env.DB_NAME,
    jwtSecret:         process.env.JWT_SECRET,
    salt:              parseInt(process.env.SALT),
    adminEmail:        process.env.ADMIN_EMAIL,
    configEmail: {

        service: "gmail",
        port: 587,
        auth: {

            user:      process.env.ADMIN_EMAIL,
            pass:      process.env.PASS_EMAIL

        }

    },
    collections: {

        admin:         process.env.COLLECTION_ADMIN,
        users:         process.env.COLLECTION_USERS,
        products:      process.env.COLLECTION_PRODUCTS,
        shoppingCarts: process.env.COLLECTION_SHOPPING_CARTS,
        orders:        process.env.COLLECTION_ORDERS

    },
    files: {

        admin:         process.env.FILE_ADMIN,
        users:         process.env.FILE_USERS,
        products:      process.env.FILE_PRODUCTS,
        shoppingCarts: process.env.FILE_SHOPPING_CARTS,
        orders:        process.env.FILE_ORDERS

    }

},    

DEFAULT_MODE = (

    (CONFIG.mode !== "production") && 
    (CONFIG.mode !== "development")
    
),
DEV_MODE = CONFIG.mode === "development";

function configId (element) {

    if (!element) throw new Element();
    if (!DEFAULT_MODE) return element._id;

    return element.id;

};

export {

    CONFIG, 
    DEV_MODE,
    DEFAULT_MODE,
    configId

};