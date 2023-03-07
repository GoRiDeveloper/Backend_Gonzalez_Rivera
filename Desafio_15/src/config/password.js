import bycrypt from "bcrypt";
import errPassParams from "../server/errors/error_password_params.js";
import errPassNeeded from "../server/errors/error_password_needed.js";
/**
 * @param {String} pass 
 * @returns {String}
 */
export async function hashPassword (pass) {

    if (!pass) throw new errPassNeeded();

    const SALT = await bycrypt.genSalt(10);

    return await bycrypt.hash(pass, SALT);

};
/**
 * @param {String} pass 
 * @param {String} passCrypt 
 * @returns {Promise <String>}
 */
export async function verifyPassword(pass, passCrypt) {

    if (!pass || !passCrypt) throw new errPassParams();

    return await bycrypt.compare(pass, passCrypt);

};