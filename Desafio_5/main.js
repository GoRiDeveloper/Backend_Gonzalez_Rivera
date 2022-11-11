const { serverConect } = require("./server.js"),
                  PORT = 8080;

const server = async () => {

    try {
        
        const newServer = await serverConect(PORT);
        console.log(`¡Conectado al Puerto : ${newServer.address().port}!`);

    } catch (err) {

        console.log(`¡¡ERROR : ${err}!!`);

    }

};

server();