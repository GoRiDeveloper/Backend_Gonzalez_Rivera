import express from "express";
import { PASSPORT } from "./middlewares/passport.js";
import { SESSIONS_ROUTER } from "./routers/sessions_router.js";
import { USERS_ROUTER } from "./routers/users_router.js";
import { PRODUCTS_ROUTER } from "./routers/products_router.js";
import { SHOPPING_CART_ROUTER } from "./routers/shopping_carts_router.js";
import { ORDERS_ROUTER } from "./routers/orders_router.js";
import { pathNotFound } from "./middlewares/path_not_found.js";
import { errorHandler } from "./middlewares/error.js";

export const APP = express();

APP.use(express.json());
APP.use(PASSPORT);

APP.use("/api/images",   express.static("./public/img"), IMAGES_ROUTER);
APP.use("/api/users",    USERS_ROUTER);
APP.use("/api/sessions", SESSIONS_ROUTER);
APP.use("/api/products", PRODUCTS_ROUTER);
APP.use("/api/carts",    SHOPPING_CART_ROUTER);
APP.use("/api/orders",   ORDERS_ROUTER);
APP.all("*",             pathNotFound);

APP.use(errorHandler);