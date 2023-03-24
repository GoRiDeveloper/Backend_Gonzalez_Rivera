import cluster from "cluster";
import os from "os";
import SERVER from "./server/containers/server/index.js";
import { LOGGER } from "./server/utils/log4js.js";
import { CONFIG } from "./config/config.js";

const CPUS = os.cpus.length;

if (cluster.isPrimary && CONFIG.mode === "cluster") {

    LOGGER.info(`PID primario : ${process.pid}`);

    cluster.schedulingPolicy - cluster.SCHED_RR

    for (let i = 0; i < CPUS; i++) cluster.fork();

    cluster.on("exit", (Worker, code, signal) => {

        LOGGER.error(`Worker : ${Worker.process.pid} muerto.`);
        cluster.fork();

    });

} else {

    SERVER.connect(CONFIG.port);
    LOGGER.info("Conectado en el puerto :", CONFIG.port);

};