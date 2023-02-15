export function auth (req, res, next) {

    req.isAuthenticated()

        ? next()
        : res.render("login");

};