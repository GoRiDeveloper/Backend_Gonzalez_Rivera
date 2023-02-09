import { Strategy } from "passport-local";
import { USERS } from "../containers/users_container.js";

const REGISTER = new Strategy({

    passReqToCallback: true

}, async (req, username, password, done) => {

    try {

        const USER = await USERS.postUser(req.body);
        done(null, USER);

    } catch (err) {

        done(null, false, err);  

    };

});

const LOGIN = new Strategy(async (username, password, done) => {

    try {

        const USER = await USERS.authUser(username, password);
        done(null, USER);
        
    } catch (err) {

        done(null, false, err);

    };

});

export { 
    
    REGISTER, 
    LOGIN 

};