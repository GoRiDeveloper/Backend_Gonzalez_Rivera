import { MESSAGES as MSG } from "../containers/container_messages.js";

export default async function handleSocket (socket, sockets) {

    const MSGS = await MSG.getMsgs();

    if (MSGS) {
        
        sockets.emit("allMessages", MSGS);

        socket.on("newMessage", async message => {

            const 

            POST_MESSAGE = await MSG.postMsg(message),
            NEW_MESSAGES = await MSG.getMsgs();

            sockets.emit("allMessages", NEW_MESSAGES);

        });

    } else {

        console.log("no hay mensajes.");

    };

};