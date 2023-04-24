import { APP } from "./app.js";
import { CONFIG } from "../config/config.js";
import { logger } from "./utils/pino.js";

const SERVER = APP.listen(

    CONFIG.port, 
    () => logger.info(`Escuchando en el Puerto : ${CONFIG.port}`)

);

SERVER.on(
    "error", 
    e => logger.error(`Error de Servidor : ${e}`)
);