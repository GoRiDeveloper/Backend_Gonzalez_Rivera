import { Strategy } from "passport-local";
import { MAIL_SEND } from "../mail/mail_sender.js";
import USERS from "../containers/users/index.js";

export const REGISTER = new Strategy({

    passReqToCallback: true,
    usernameField: "user",
    passwordField: "pass"

}, async (req, user, pass, done) => {

    try {
        
        const 
        
        USER = await USERS.addUser(req.body),

        mailOptions = {

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
        done(null, USER);
        
    } catch (e) {

        done(e, null);

    }

});