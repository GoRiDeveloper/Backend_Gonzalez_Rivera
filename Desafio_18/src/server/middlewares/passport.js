import passport from "passport";
import {REGISTER, LOGIN} from "./passport_strategies.js";
import { mdbPersistence/*, configID*/ } from "../../config/config.js";
import USERS from "../containers/users/index.js";

passport.use("register", REGISTER);
passport.use("login", LOGIN);

export const PASSPORT = passport.initialize();

passport.serializeUser((user, done) => {

    const USER = {

        //id: configID(user),
        ...( mdbPersistence
                ? { id: user._id } 
                : { id: user.id }
        ),
        username: user.username

    };
    done(null, USER);

});

passport.deserializeUser(async (user, done) => {

    try {

        const 
        
        GET_USER = await USERS.getUser(user.id),
        USER     = await GET_USER.data();

        done(null, USER);
        
    } catch (e) {

        done(e, null);

    };

});

export const PASSPORT_SESSION = passport.session();