export default function isAuth (req, res, next) {

    req.isAuthenticated()

        ? next()
        : res.status(401).json({ Error: "No estás Autenticado." });

};