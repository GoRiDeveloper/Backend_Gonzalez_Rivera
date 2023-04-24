import { USER_SERVICE } from "../service/user/index.js";
import { ORDER_SERVICE } from "../service/orders/index.js";
import { configId } from "../../config/config.js";

export async function controllerGetOrders ({ headers }, res) {

    const 

    USER   = USER_SERVICE.getDataUser(headers),
    ORDERS = await ORDER_SERVICE.getPurchaseOrdersFromUser(configId(USER));

    res.status(200).json(ORDERS);

};

export async function controllerPostOrder (req, res) {

    const 
    
    USER  = USER_SERVICE.getDataUser(headers),
    ORDER = await ORDER_SERVICE.createNewOrder(configId(USER), USER.email);

    res.status(201).json(ORDER);

};