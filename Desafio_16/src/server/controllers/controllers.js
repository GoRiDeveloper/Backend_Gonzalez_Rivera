import passport from "passport";

const CONTROLLER_REGISTER = passport.authenticate(
    
    "register", 
    {
        successRedirect: "/login",
        failureRedirect: "/register/fail"
    }

);

const CONTROLLER_LOGIN = passport.authenticate(

    "login",
    {
        successRedirect: "/login/success",
        failureRedirect: "/login/fail"
    }

);

function controllerFailRegister (req, res) {

    res.status(500).json({ Mensaje: "Fallo el registro." });

};

function controllerSuccessLogin (req, res) {
    
    res.status(200).json({ Mensaje: "Haz iniciado sesión." });

};

function controllerFailLogin (req, res) {

    res.status(400).json({ Mensaje: "No se pudo iniciar sesión." });

};

function controllerHome (req, res) {

    const USERNAME = req.user.user;
    res.status(200).json({ Mensaje: `Estas en el Home ${USERNAME}.` });

};

function controllerLogout (req, res) {

    const USERNAME = req.user.user;

    req.logOut((err) => {

        if (err) throw "Fallo el cierre de sesión.";

    });

    res.status(200).json({ Mensaje: `Has cerrado sesión. ¡Vuelve pronto ${USERNAME}!`});

};

function controllerAllRoutes (req, res) {

    res.status(404).json({ Error: "Ruta no implementada."});

};

export {

    CONTROLLER_REGISTER,
    CONTROLLER_LOGIN,
    controllerFailRegister,
    controllerSuccessLogin,
    controllerFailLogin,
    controllerHome,
    controllerLogout,
    controllerAllRoutes

};