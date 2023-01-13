function controllerGetRouter (req, res) {

    req.session.username
        
        ? res.render("home", { logged: true, name: req.session.username })
        : res.render("home", { logged: false });

};

export { controllerGetRouter };