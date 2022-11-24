import serverConect from "./server.js";

const PORT = 8080 ?? process.env.PORT;

async function server() {

    try {
        
        const newServer = await serverConect(PORT);
        console.log(`¡Conectado al Puerto : ${newServer.address().port}!`);

    } catch (err) {
    
        console.log(`¡¡ERROR : ${err}!!`);
        
    };

};

server();