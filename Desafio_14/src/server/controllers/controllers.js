import passport from "passport";
import { LOGGER } from "../utils/log4js.js";

function logRequest (req, res, next) {

    LOGGER.info("Petición de Recurso :", req.url);
    next();

};

function controllerHome ({ session }, res) {

    if (session.cookie.userId) return res.render("home", { loggued: true, name: session.cookie.username });

    res.render("home", { loggued: false });

};

function controllerRedirectLogin (req, res) {

    res.render("login");

};

function controllerRedirectRegister (req, res) {

    res.render("register");

};

const CONTROLLER_REGISTER = passport.authenticate(
    
    "register", 
    { 

        successRedirect: "/register/success", 
        failureRedirect: "/register/fail" 
    
    }

);

function controllerSuccessRegister (req, res) {

    if (req.user) return res.render("login", { username: req.user.username });

};

function controllerFailRegister (req, res) {

    res.status(400).render("error", { error: "Fallo el registro." });

};

const CONTROLLER_LOGIN = passport.authenticate(

    "login",
    {

        successRedirect: "/login/success",
        failureRedirect: "/login/fail"

    }

);

function controllerSuccessLogin ({ session }, res) {

    if (!session.passport) return res.redirect("/login/fail");

    if (session.passport.user) {

        res.cookie("id", session.passport.user.id, { maxAge: 60000 });
        res.cookie("username", session.passport.user.username, { maxAge: 60000 });

        const ITEMS = {

            loggued: true,
            name: session.passport.user.username

        };

        res.render("home", ITEMS);

    } else {

        if (!session.passport) return res.status(400).render("error", { error: "Tu sesión caducó" });

    };

};

function controllerFailLogin (req, res) {

    res.status(400).render("error", { error: "Fallo el inicio de sesión" });

};

function controllerLogout (req, res) {

    if (req.cookies) {

        const { username } = req.cookies;

        req.session.destroy(() => res.render("logout", { username }));

    } else {

        res.render("home", { loggued: false });

    };

};

function controllerInfo (req, res) {

    const DATA = {

        args: process.argv.slice(2),
        os: process.platform,
        nodeVersion: process.versions.node,
        rss: process.memoryUsage.rss(),
        execPath: process.execPath,
        pid: process.pid,
        path: process.cwd()

    };

    if (!DATA) return res.status(404).render("error", { error: "No se obtuvierón los datos correctamente." });

    res.status(201).render("info", DATA);

};

function controllerAllRoutes (req, res) {

    res.status(404).render("error", { error: "Ruta no implementada" });

};

export { 

    logRequest,
    CONTROLLER_REGISTER, 
    CONTROLLER_LOGIN,
    controllerHome,
    controllerRedirectLogin,
    controllerRedirectRegister,
    controllerSuccessRegister,
    controllerFailRegister,
    controllerSuccessLogin,
    controllerFailLogin,
    controllerLogout,
    controllerInfo,
    controllerAllRoutes 

};