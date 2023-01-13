function controllerLogin ({ body, session }, res) {

    const REGISTERED = body;

    session.username = REGISTERED.name;
    session.admin = true;

    res.redirect("/");

};

function controllerLogout ({ session }, res) {

    if (session.username) {

        const { username } = session;

        session.destroy(() => {

            res.render("logout", { bye: true, name: username });

        });

    } else {

        res.render("home", { logged: false });

    };

};

export {

    controllerLogin,
    controllerLogout

};