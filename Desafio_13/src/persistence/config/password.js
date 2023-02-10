import jwt from "jsonwebtoken";
import { SECRET } from "./config.js";

async function hashPassword (pass) {

    const PASSWORD = await jwt.sign(pass, SECRET);

    return PASSWORD;

};

async function verifyPassword (token) {

    const PASSWORD = await jwt.verify(token, SECRET);

    return PASSWORD;

};

export { hashPassword, verifyPassword };