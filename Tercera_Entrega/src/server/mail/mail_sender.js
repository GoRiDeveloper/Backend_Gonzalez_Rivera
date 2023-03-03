import { createTransport } from "nodemailer";
import { CONFIG } from "../../config/config.js";

class MailSender {

    #client

    constructor (config) {

        this.#client = createTransport(config);

    };

    async send (mailOptions) {

        try {

            return await this.#client.sendMail(mailOptions);
            
        } catch (err) {
          
            throw `No se envio el correo. Error ${err.message}`;
            
        };

    };

};

export const MAIL_SEND = new MailSender(CONFIG.configMail);