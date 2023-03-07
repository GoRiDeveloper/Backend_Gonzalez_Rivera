import passport from "passport";
import {REGISTER, LOGIN} from "./passport_strategies.js";
import { persistence } from "../../config/config.js";
import { USERS } from "../containers/container_users.js";

passport.use("register", REGISTER);
passport.use("login", LOGIN);

export const PASSPORT = passport.initialize();

passport.serializeUser((user, done) => {

    const USER = {

        ...( persistence
                ? { id: user._id } 
                : { id: user.id }
        ),
        username: user.username

    };
    done(null, USER);

});

passport.deserializeUser(async (user, done) => {

    try {

        const GET_USER = await USERS.getUser(user.id);
        done(null, GET_USER);
        
    } catch (e) {

        done(e, null);

    };

});

export const PASSPORT_SESSION = passport.session();