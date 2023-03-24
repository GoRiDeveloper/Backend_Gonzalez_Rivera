import { config } from "dotenv";
import ErrThereIsNoData from "../server/errors/error_there_is_no_data.js";

config({ path: ".env" });

const CONFIG = {

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

        service: "gmail",
        port: 587,
        auth: {
    
            user: "riveragovanni305@gmail.com",
            pass: "fhauueygrmlvrmso"
    
        }
    
    }

};

const mdbPersistence = CONFIG.persistence === "mongodb";
/**
 * 
 * @param {Object} element 
 * @returns {String<IdLike>}
 */
function configID (element) {

    if (!element) throw new ErrThereIsNoData();
    if (mdbPersistence) return element._id;
    return element.id;
    
};
/**
 * @param {Object} item 
 * @param {Number} index 
 * @returns 
 */
function getValue (item, index) {

    return Object.values(item)[index];

};
/**
 * @param {Object} item 
 * @param {Number} index 
 * @returns 
 */
function getKey (item, index) {

    return Object.keys(item)[index];

};

export { 

    CONFIG,
    mdbPersistence,
    configID,
    getValue,
    getKey

};