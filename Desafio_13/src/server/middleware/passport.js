import passport from "passport";
import { USERS } from "../containers/users_container.js";
import { REGISTER, LOGIN } from "./passport_strategies.js";

passport.use("register", REGISTER);
passport.use("login", LOGIN);

const PASSPORT = passport.initialize();

passport.serializeUser((user, done) => {

    const USER = {

        id: user.id,
        username: user.username

    };

    done(null, USER);

});

passport.deserializeUser(async (USER, done) => {

    try {

        const 
        
        { id } = USER,
        GET_USER   = await USERS.getUser(id);

        done(null, GET_USER);
        
    } catch (err) {

        done(err);

    };

});

const PASSPORT_SESSION = passport.session();

export { PASSPORT, PASSPORT_SESSION };