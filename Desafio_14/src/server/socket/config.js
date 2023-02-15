import handleSocket from "./socket.js";
import { Server } from "socket.io";

export default async function configureSocket (server) {

    const IO = new Server(server);    

    IO.on("connection", socket => {

        handleSocket(socket, IO.sockets);

    });

};