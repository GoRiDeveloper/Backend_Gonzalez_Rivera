import { MESSAGES as MSG } from "../containers/container_messages.js";

async function controllerGetMessages (req, res) {

    const MESSAGES = await MSG.getMsgs();

    MESSAGES

        ? res.status(200).json(MESSAGES)
        : res.status(404).render("error", { error: "No hay Mensajes" });

};

async function controllerPostMessage ({ body }, res) {

    const MESSAGE = await MSG.postMsg(body);

    MESSAGE

        ? res.status(200).json(MESSAGE)
        : res.status(500).error("error", { error: "No se pudo enviar el Mensaje." });

};

async function controllerDeleteMessage ({ params: { id } }, res) {

    const ERASED = await MSG.deleteMsg(id);

    ERASED

        ? res.status(200).json(ERASED)
        : res.status(404).render("error", { error: `El Mensaje con el ID : "${id}", no se encontro.` });

};

export {

    controllerGetMessages,
    controllerPostMessage,
    controllerDeleteMessage

};