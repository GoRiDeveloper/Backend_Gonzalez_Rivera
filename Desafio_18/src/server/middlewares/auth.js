import ErrAuth from "../errors/error_auth.js";

export default function isAuth (req, res, next) {

    if (!req.isAuthenticated()) throw new ErrAuth();
    next();

};