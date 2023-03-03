import bycrypt from "bcrypt";
/**
 * @param {String} pass 
 * @returns {String}
 */
export async function hashPassword (pass) {

    if (!pass) throw "Se necesita una contraseña.";

    const SALT = await bycrypt.genSalt(10);

    return await bycrypt.hash(pass, SALT);

};
/**
 * @param {String} pass 
 * @param {String} passCrypt 
 * @returns {String}
 */
export async function verifyPassword(pass, passCrypt) {

    if (!pass || !passCrypt) 
        throw `Se necesita la contraseña y la contraseña encriptada.`;

    return await bycrypt.compare(pass, passCrypt);

};