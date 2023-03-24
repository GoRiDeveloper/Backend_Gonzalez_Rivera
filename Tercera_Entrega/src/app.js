import express, { json } from "express";
import sessionMongo from "./server/middlewares/session.js"
import { PASSPORT, PASSPORT_SESSION } from "./server/middlewares/passport.js";
import { PRODS_ROUTER } from "./server/routers/products_router.js";
import { CARTS_ROUTER } from "./server/routers/carts_router.js";
import { ROUTER } from "./server/routers/router.js";

export const APP = express();

APP.use(json());
APP.use(sessionMongo);
APP.use(PASSPORT);
APP.use(PASSPORT_SESSION);

APP.use("/api/products", PRODS_ROUTER);
APP.use("/api/carts", CARTS_ROUTER);
APP.use("/", ROUTER);