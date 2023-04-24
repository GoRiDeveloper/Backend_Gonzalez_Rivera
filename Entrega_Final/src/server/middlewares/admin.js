import { USER_SERVICE } from "../service/user/index.js";
import ErrAdmin from "../models/errors/error_admin.js";

export function isAdmin ({ headers }, res, next) {

    const USER = USER_SERVICE.getDataUser(headers);

    if (USER.role !== "Admin") throw new ErrAdmin();

    next();

};