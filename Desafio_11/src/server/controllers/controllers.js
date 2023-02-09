import passport from "passport";

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

async function controllerSuccessLogin ({ session }, res) {

    if (!session.passport) return res.redirect("/login/fail");

    if (session.passport.user) {

        if (!session.cookie.userId) {

            session.cookie.userId = session.passport.user.id;
            session.cookie.username = session.passport.user.username;

            const ITEMS = {

                loggued: true,
                name: session.cookie.username

            };

            res.render("home", ITEMS);

        };

    } else {

        if (!session.cookie.userId) return res.status(400).render("error", { error: "Tu sesión caducó" });

        const ITEMS = {

            loggued: true,
            name: session.cookie.username

        };

        res.render("home", ITEMS);

    };

};

function controllerFailLogin (req, res) {

    res.status(400).render("error", { error: "Fallo el inicio de sesión" });

};

function controllerLogout ({ session }, res) {

    if (session.passport.username) {

        const { username } = session.passport;

        session.destroy(() => res.render("logout", { username }));

    } else {

        res.render("home", { loggued: false });

    };

};

function controllerAllRoutes (req, res) {

    res.status(404).render("error", { error: "Ruta no implementada" });

};

export { 

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
    controllerAllRoutes 

};