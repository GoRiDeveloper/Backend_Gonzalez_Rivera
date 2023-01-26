import { authError } from "../models/error_model.js";

export function isAuthenticated (req, res, next) {

    !req.session.cookie.userId

        ? next(authError())
        : next();

};