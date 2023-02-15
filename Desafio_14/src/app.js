import express, { json, urlencoded, static as Static } from "express";
import { PASSPORT, PASSPORT_SESSION } from "./server/middlewares/passport.js";
import { SESSION } from "./server/middlewares/session.js";
import { HBS } from "./server/middlewares/handlebars.js";
import { PRODUCTS_ROUTER } from "./server/routers/products_router.js";
import { MESSAGES_ROUTER } from "./server/routers/messages_router.js";
import { API_ROUTER } from "./server/routers/api_router.js";
import { ROUTER } from "./server/routers/router.js";

export const APP = express();

APP.use(json());
APP.use(urlencoded({ extended: true }));
APP.use(Static("public"));
APP.use(SESSION);
APP.use(PASSPORT);
APP.use(PASSPORT_SESSION);

APP.set("views", "./views");
APP.set("view engine", ".hbs");

APP.engine(".hbs", HBS);

APP.use("/products", PRODUCTS_ROUTER);
APP.use("/messages", MESSAGES_ROUTER);
APP.use("/api", API_ROUTER);
APP.use("/", ROUTER);