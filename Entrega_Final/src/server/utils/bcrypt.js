import bcrypt from "bcryptjs";
import { CONFIG } from "../../config/config.js";
import ErrPass from "../models/errors/error_password.js";
import ErrPassNeeded from "../models/errors/error_password_needed.js";

export async function hashPassword (pass) {

    if (!pass) throw new ErrPassNeeded();

    const SALT = await bcrypt.genSalt(CONFIG.salt);

    return await bcrypt.hash(pass, SALT);

};

export async function verifyPassword (pass, encryptPass) {

    if (!pass || !encryptPass) throw new ErrPass();

    return await bcrypt.compare(pass, encryptPass);

};