import passport from "passport";

let options = { 
    failWithError: true, 
    session: false 
};

export const 

REGISTER = passport.authenticate("register", options),
LOGIN    = passport.authenticate("login", options);