import { VALIDATIONS } from "../models/validations/index.js";

export class EmailDTO {

    constructor ({ from, to, subject, html }) {

        VALIDATIONS.emptyField({ from });
        VALIDATIONS.emptyField({ to });
        VALIDATIONS.emptyField({ subject });
        VALIDATIONS.emptyField({ html });
        VALIDATIONS.alphabeticValidation({ subject });

        this.from    = from;
        this.to      = to;
        this.subject = subject;
        this.html    = html;

    };

};