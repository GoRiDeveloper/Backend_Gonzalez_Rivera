import { ContainerServer } from "./server/containers/container_server.js";
import { CONFIG } from "./config/config.js";
import { LOGGER } from "./server/utils/log4js.js";
import cluster from "cluster";
import os from "os";

const 

SERVER = new ContainerServer(),
CPUS   = os.cpus().length;

if (cluster.isPrimary && CONFIG.MODE === "cluster") {

    LOGGER.info(`PID primario : ${process.pid}`);

    cluster.schedulingPolicy - cluster.SCHED_RR

    for (let i = 0; i < CPUS; i++) {

        cluster.fork();

    };

    cluster.on("exit", (worker, code, signal) => {

        LOGGER.error(`Worker ${worker.process.pid} muerto.`);
        cluster.fork();

    });

} else {

    LOGGER.info("Conectado sin Cluster");
    SERVER.connect(CONFIG.PORT);

};