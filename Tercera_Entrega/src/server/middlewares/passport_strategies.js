import { Strategy } from "passport-local";
import { USERS } from "../containers/container_users.js";
import { MAIL_SEND } from "../mail/mail_sender.js";

export const REGISTER = new Strategy({

    passReqToCallback: true,
    usernameField: "user",
    passwordField: "pass"

}, async (req, user, pass, done) => {

    try {

        const USER = await USERS.addUser(req.body);

        if (!USER) throw "El Usuario ya existe o no se pudo guardar.";

        const mailOptions = {

            from: "Registros",
            to: "alancaminante1515@gmail.com",
            subject: "Nuevo Usuario Registrado",
            html: `<h1 style='color: green;'>Usuario ${USER.user}</h1><p>${JSON.stringify(USER)}</p>`

        },
        SEND_MAIL = await MAIL_SEND.send(mailOptions);

        done(null, USER);
        
    } catch (e) {

        done(e, false);

    };

});

export const LOGIN = new Strategy({

    usernameField: "user",
    passwordField: "pass"

}, async (user, pass, done) => {

    try {

        const USER = await USERS.authUser(user, pass);

        if (!USER) throw "No se encontró el usuario.";

        done(null, USER);
        
    } catch (e) {

        done(e, null);

    }

});