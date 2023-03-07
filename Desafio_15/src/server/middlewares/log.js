import { LOGGER } from "../../server/utils/log4js.js";

export default function logRequest (req, res, next) {

    LOGGER.info("Petición de Recurso :", req.url);
    next();

};