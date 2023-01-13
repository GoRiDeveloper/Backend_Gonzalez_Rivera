import { MESSAGES as MSG } from "../containers/server_containers/messages_container.js";

async function controllerGetMessages (req, res) {

    const MESSAGES = await MSG.getMsgs();

    MESSAGES

        ? res.status(200).json(MESSAGES)
        : res.status(404).json({ Error: "No hay mensajes." });

};

async function controllerPostMessage ({ body }, res) {

    const MESSAGE = await MSG.postMsg(body);

    MESSAGE

        ? res.status(200).json(MESSAGE)
        : res.status(500).json({ Error: "No se pudo enviar el Mensaje." });

};

async function controllerDeleteMessage ({ params: { id } }, res) {

    const ERASED = await MSG.deleteMsg(id.trim());

    ERASED

        ? res.status(200).json(ERASED)
        : res.status(404).json({ Error: `El Producto con el ID : "${id}" no se encontro.` });

};

export {

    controllerGetMessages,
    controllerPostMessage,
    controllerDeleteMessage

};