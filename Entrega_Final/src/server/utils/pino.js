import pino from "pino";
import { DEV_MODE } from "../../config/config.js";

export let logger;

function prodLogger () {

    const buildProd = pino("debug.log");
    buildProd.level = "debug";
    return buildProd;

};

function devLogger () {

    const buildDev = pino();
    buildDev.level = "info";
    return buildDev;

};

DEV_MODE
    ? logger = devLogger() 
    : logger = prodLogger();