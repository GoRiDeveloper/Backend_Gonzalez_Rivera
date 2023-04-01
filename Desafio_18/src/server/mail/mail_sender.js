import { createTransport } from "nodemailer";
import { CONFIG } from "../../config/config.js";
import ErrMail from "../errors/error_mail.js";

class EmailSender {

    #client;

    constructor (config) {

        if (!config) throw new ErrMail();
        this.#client = createTransport(config);

    };

    async send (mailOptions) {

        try {

            return await this.#client.sendMail(mailOptions);
            
        } catch (err) {
          
            throw new ErrMail();
            
        };

    };

};

export const MAIL_SEND = new EmailSender(CONFIG.configMail);