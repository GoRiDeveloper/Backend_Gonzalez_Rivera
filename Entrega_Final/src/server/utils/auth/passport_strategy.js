import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { CONFIG } from "../../../config/config.js";
import { USER_SERVICE } from "../../service/user/index.js";
import { encryptToken } from "../jwt_utils.js";

const 

LOCAL_OPTIONS = {
    passReqToCallback: true,
    usernameField: "user",
    passwordField: "pass"
},
JWT_OPTIONS   = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwtSecret
};

export const 

    REGISTER_STRATEGY = new LocalStrategy(
        
        LOCAL_OPTIONS, 
        async (req, user, pass, done) => {

            try {
            
                const 
                
                USER  = await USER_SERVICE.register(req.body),
                TOKEN = "Bearer " + encryptToken(USER);

                done(null, TOKEN);

            } catch (e) {

                done(e, false);

            };

        }

    ),

    LOGIN_STRATEGY = new JWTStrategy(

        JWT_OPTIONS, 
        (user, done) => done(null, user)
        
    );