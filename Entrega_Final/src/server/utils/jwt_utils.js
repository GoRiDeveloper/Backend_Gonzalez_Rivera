import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/config.js";

export const encryptToken = (data) => jwt.sign(data, CONFIG.jwtSecret, { expiresIn: "24hr" });

export const decryptToken = (token) => jwt.verify(token, CONFIG.jwtSecret);