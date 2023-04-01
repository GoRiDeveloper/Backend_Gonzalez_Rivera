import Validations from "../validations/index.js";
import UserDTO from "./dtos/UserDTO.js";
import ErrPassword from "../../errors/error_password.js";
import ErrorPasswordParams from "../../errors/error_password_params.js";
import {hashPassword, verifyPassword} from "../../../config/password.js";

export default class User {

    #id;
    #name;
    #lastName;
    #user;
    #email;
    #pass;
    #age;
    #avatar;

    constructor ({id, name, lastName, user, email, pass, age, avatar}) {

        this.#emptyUserFieldValidation(name, lastName, user, email, pass);

        const ALPHABETIC_PARAMS = [name, lastName];

        Validations.alphabeticValidation(ALPHABETIC_PARAMS);
        Validations.imgValidation(avatar);
        Validations.emailValidation(email);

        this.#id       = id;
        this.#name     = name;
        this.#lastName = lastName;
        this.#user     = user;
        this.#email    = email;
        this.#pass     = pass;
        this.#age      = age;
        this.#avatar   = avatar;

    };

    get getUser () {

        return this.#user;

    };

    #emptyUserFieldValidation (name, lastName, user, email, pass) {

        Validations.emptyField({ name });        
        Validations.emptyField({ lastName });
        Validations.emptyField({ user });
        Validations.emptyField({ email });
        Validations.emptyField({ pass });
    
    };

    async hashPass (pass) {

        return await hashPassword(pass);

    };

    static async updateValidation (user) {

        let alphabeticElements = [];

        const

        NAME         = user.name      && user.name,
        LAST_NAME    = user.lastName  && user.lastName,
        AGE          = user.age       && user.age,
        EMAIL        = user.email     && user.email,
        USER         = user.user      && user.user,
        ENCRYPT_PASS = user.cryptPass && user.cryptPass,
        NEW_PASS     = user.newPass   && user.newPass,
        OLD_PASS     = user.oldPass   && user.oldPass,
        AVATAR       = user.img       && user.img;
        
        if (NAME)              alphabeticElements.push(NAME);
        if (LAST_NAME)         alphabeticElements.push(LAST_NAME);
        if (AGE)               user.age = Validations.intValidation({ AGE });
        if (EMAIL)             Validations.emailValidation(EMAIL);
        if (USER)              Validations.emptyField(USER);
        if (AVATAR)            Validations.imgValidation(AVATAR);
        if (NAME || LAST_NAME) Validations.alphabeticValidation(alphabeticElements);
        if (ENCRYPT_PASS && NEW_PASS && OLD_PASS) {

            Validations.emptyField({ ENCRYPT_PASS });
            Validations.emptyField({ NEW_PASS });
            Validations.emptyField({ OLD_PASS });

            const COMPARE = await verifyPassword(OLD_PASS, ENCRYPT_PASS);
            if (!COMPARE) throw new ErrPassword();

            user.pass = await this.hashPass(NEW_PASS);

        };
        if (
            !(ENCRYPT_PASS && NEW_PASS && OLD_PASS) && 
            (ENCRYPT_PASS || NEW_PASS || OLD_PASS)
        ) 
            throw new ErrorPasswordParams();

        return user;

    };

    async data () {

        const NEW_PASS = await this.hashPass(this.#pass);

        return new UserDTO({

            id: this.#id,
            name: this.#name,
            lastName: this.#lastName,
            email: this.#email,
            user: this.#user,
            pass: NEW_PASS,
            age: this.#age,
            avatar: this.#avatar

        });

    };

};