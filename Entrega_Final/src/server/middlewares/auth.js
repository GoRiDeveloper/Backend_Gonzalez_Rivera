import ErrAuth from "../models/errors/error_auth.js";

export function isAuth (req, res, next) {

    const auth = req.headers.authorization;

    if (!auth) throw new ErrAuth();

    next();

};