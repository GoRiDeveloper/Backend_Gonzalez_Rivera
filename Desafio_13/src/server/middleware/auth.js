import { authError } from "../models/error_model.js";

export function isAuthenticated (req, res, next) {

    !req.cookies.id

        ? next(authError())
        : next();

};