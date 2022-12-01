import { msg } from "../classes/classe_msg.js"
import { randomUUID } from "crypto";

async function controllerGetMsg (req, res) {

    const MESSAGES = await msg.getMsg();

    if (MESSAGES) {

        res.status(200);
        res.json(MESSAGES);
        
    } else {

        res.status(404);
        res.json({ Error: "No existen Mensajes." });
        
    };

};

async function controllerPostMsg ({ body }, res) {

    if (!body.author || !body.message) {

        res.status(400);
        res.json({ Error: "Algún campo del Mensaje esta vacío." });        

    } else {

        const NEW_BODY = {

            id: randomUUID(),
            date: new Date().toLocaleString(),
            ...body

        };

        const SEND_MESSAGE = await msg.postMsg(NEW_BODY);

        if (SEND_MESSAGE) {

            res.status(201);
            res.json(SEND_MESSAGE);

        } else {

            res.status(500);
            res.json({ Error: "Ocurrió un Error al enviar el Mensaje." });

        };

    };

}; 

async function controllerDeleteMsg ({ params: { id } }, res) {

    const ERASED = await msg.deleteMsg(id);

    if (ERASED) {

        res.status(200);
        res.json(ERASED);
        
    } else {

        res.status(404);
        res.json({ Error : `No sé encontró ningún Mensaje con el ID : ${id}` });
        
    };

};

export {

    controllerGetMsg,
    controllerPostMsg,
    controllerDeleteMsg

};