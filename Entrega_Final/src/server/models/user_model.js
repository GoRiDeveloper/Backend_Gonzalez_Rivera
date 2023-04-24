import { createId } from "../utils/create_id.js";
import { hashPassword, verifyPassword } from "../utils/bcrypt.js";
import { VALIDATIONS } from "./validations/index.js";
import { UserDTO } from "../dtos/user_dto.js";
import ErrPass from "./errors/error_password.js";
import ErrPassParams from "./errors/error_password_params.js";

export class User {

    #id;
    #name;
    #lastName;
    #email;
    #pass;
    #image;

    static async updateValidation (user) {

        const 

        NAME         = user.name        && { name: user.name },
        LAST_NAME    = user.lastName    && { lastName: user.lastName },
        EMAIL        = user.email       && user.email,
        ENCRYPT_PASS = user.encryptPass && user.encryptPass,
        NEW_PASS     = user.newPass     && user.newPass,
        OLD_PASS     = user.oldPass     && user.oldPass,
        IMAGE        = user.image       && user.image;

        if (EMAIL) VALIDATIONS.emailValidation(EMAIL);
        if (IMAGE) VALIDATIONS.imgValidation(IMAGE);
        if (NAME) { 

            VALIDATIONS.emptyField(NAME);
            VALIDATIONS.alphabeticValidation(NAME);

        };
        if (LAST_NAME) { 

            VALIDATIONS.emptyField(LAST_NAME);
            VALIDATIONS.alphabeticValidation(LAST_NAME);

        };
        if (ENCRYPT_PASS && NEW_PASS && OLD_PASS) {

            VALIDATIONS.emptyField({ encryptPass: ENCRYPT_PASS });
            VALIDATIONS.emptyField({ newPass: NEW_PASS });
            VALIDATIONS.emptyField({ oldPass: OLD_PASS });

            const COMPARE = await verifyPassword(OLD_PASS, ENCRYPT_PASS);
            if (!COMPARE) throw new ErrPass();

            user.pass = await hashPassword(NEW_PASS);

        };
        if (
            !(ENCRYPT_PASS && NEW_PASS && OLD_PASS) && 
            (ENCRYPT_PASS || NEW_PASS || OLD_PASS)
        ) 
            throw new ErrPassParams();

        return user;

    };

    constructor ({ 

        id = createId(), 
        name, 
        lastName, 
        email, 
        pass, 
        image = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" 
    
    }) {

        this.#id       = id;
        this.#name     = name;
        this.#lastName = lastName;
        this.#email    = email;
        this.#pass     = pass;
        this.#image    = image;

    };

    get getId () {

        return this.#id;

    };

    async #hashPass (pass) { 
        
        VALIDATIONS.emptyField({ pass });
        return await hashPassword(pass);

    };

    async asDto () {
        
        const 
        
        PASS     = this.#pass,
        NEW_PASS = await this.#hashPass(PASS),
        ROLE     = await VALIDATIONS.verifyEmail(email);

        return new UserDTO({

            id: this.#id,
            role: ROLE ? "Admin" : "User",
            name: this.#name,
            lastName: this.#lastName,
            email: this.#email,
            pass: NEW_PASS,
            image: this.#image

        });

    };

};