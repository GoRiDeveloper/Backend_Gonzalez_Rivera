const { serverConect } = require("./server.js");

const server = async () => {

    try {
        
        const newServer = await serverConect(8080);
        console.log(`¡Conectado al Puerto : ${newServer.address().port}!`);

    } catch (err) {
        
        console.log(`¡¡ERROR : ${err}!!`);

    }

};

server();