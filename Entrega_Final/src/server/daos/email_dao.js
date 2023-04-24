import { createTransport } from "nodemailer";
import { Email } from "../models/email_model.js";
import { CONFIG } from "../../config/config.js";
import ErrSendEmail from "../models/errors/error_send_email.js";

export class EmailDAO {

    #client;

    constructor (config) {

        this.#client = createTransport(config);

    };

    async sendEmail (mailOptions) {

        try {
            
            return await this.#client.sendMail(mailOptions);

        } catch (e) {
            
            throw new ErrSendEmail();
        };

    };

    async sendOrderEmails (data, emailUser) {

        const
        
        DATA_HTML_ADMIN  = {

            header: `Pedido de : ${emailUser}`,
            info : {

                ...(data.forEach(prod => { 

                    return {

                        id: prod.id, 
                        qty: prod.quantity

                    } 

                }))

            }

        },
        DATA_HTML_USER   = {

            header: `Usuario : ${emailUser}`,
            info : {

                ...(data.forEach(prod => { 

                    return {

                        id: prod.id, 
                        qty: prod.quantity

                    } 

                }))

            }

        },
        HTML_ADMIN       = Email.createHTML(DATA_HTML_ADMIN),
        HTML_USER        = Email.createHTML(DATA_HTML_USER),
        DATA_EMAIL_ADMIN = {

            from: "Pedido Realizado",
            to: CONFIG.adminEmail,
            subject: "Nuevo Pedido",
            html: HTML_ADMIN

        },
        DATA_EMAIL_USER  = {

            from: "Pedido Realizado",
            to: emailUser,
            subject: "Compra Realizada",
            html: HTML_USER

        },
        EMAIL_ADMIN      = new Email(DATA_EMAIL_ADMIN),
        EMAIL_USER       = new Email(DATA_EMAIL_USER);

        await this.sendEmail(EMAIL_ADMIN);
        await this.sendEmail(EMAIL_USER);

    };

};