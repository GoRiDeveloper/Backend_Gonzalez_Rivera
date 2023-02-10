import parseArgs from "minimist";
import cluster from "cluster";
import Server from "./server.js";

const 

SERVER = new Server(),
OPTIONS = {

    default: {

        PORT: 8080,
        MODE: "fork"

    }

},
CONFIG = parseArgs(process.argv.slice(2), OPTIONS);

if (CONFIG.MODE === "cluster") {

    if (cluster.isPrimary) {

        console.log(`Proceso Padre : ${process.pid}`);

        for (let i = 0; i < 3; i++) {

            cluster.fork();

        };

        cluster.on("exit", () => cluster.fork());

    } else {

        await SERVER.connect(CONFIG.PORT);

    };

} else {

    await SERVER.connect(CONFIG.PORT);

};