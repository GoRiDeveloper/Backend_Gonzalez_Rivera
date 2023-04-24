import { VALIDATIONS } from "../models/validations/index.js";

export class UserDTO {

    constructor ({ id, role, name, lastName, email, pass, image }) {

        VALIDATIONS.emptyField({ id });
        VALIDATIONS.emptyField({ role });
        VALIDATIONS.emptyField({ name });
        VALIDATIONS.emptyField({ lastName });
        VALIDATIONS.emptyField({ email });
        VALIDATIONS.emptyField({ pass });
        VALIDATIONS.emptyField({ image });
        VALIDATIONS.alphabeticValidation({ role });
        VALIDATIONS.alphabeticValidation({ name });
        VALIDATIONS.alphabeticValidation({ lastName });
        VALIDATIONS.emailValidation(email);
        VALIDATIONS.imgValidation(image);

        this.id       = id;
        this.role     = role;
        this.name     = name;
        this.lastName = lastName;
        this.email    = email;
        this.pass     = pass;
        this.image    = image;

    };

};