import { User } from "../../models/user_model.js";
import { SHOPPING_CART_SERVICE } from "../../service/shopping_cart/index.js";
import { decryptToken } from "../../utils/jwt_utils.js";

export class UserService {

    #userDao;
    
    constructor (userDao) {

        this.#userDao = userDao;

    };

    getDataUser (headers) {

        const 
    
        GET_TOKEN = headers.authorization,
        TOKEN     = GET_TOKEN.replace("Bearer ", "");

        return decryptToken(TOKEN);

    };

    async register (user) {

        const 

        NEW_USER   = new User(user),
        USER_ID    = NEW_USER.getId,
        USER_DTO   = await NEW_USER.asDto(),
        USER_ADDED = await this.#userDao.addUser(USER_DTO);;

        await SHOPPING_CART_SERVICE.addNewCart(USER_ID);

        return USER_ADDED;

    };

};