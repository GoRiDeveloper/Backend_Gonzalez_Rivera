import ErrCouldNotGet from "../models/errors/error_could_not_get.js";

export class AdminDAO {

    #persistence;

    constructor (daoPersistence) {

        this.#persistence = daoPersistence;

    };

    async getAdminEmails () {

        const DATA = await this.#persistence.getAll();

        if (!DATA) throw new ErrCouldNotGet();

        const ADMIN_EMAILS = DATA[0];

        return ADMIN_EMAILS.admin;

    };

    async verifyAdmin (email) {

        const 
        
        EMAILS = await this.getAdminEmails();
        VERIFY = EMAILS.includes(email);

        if (!VERIFY) return false;
        return true;

    };

};