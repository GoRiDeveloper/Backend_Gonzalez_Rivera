import {randomUUID as generateID} from "crypto";
import userValidation from "../models/validations/users_validations.js";
import { containerUsers } from "../../persistence/containers/switch_container.js";
import { verifyPassword } from "../../config/password.js";

class ContainerUsers {

    #container 

    constructor () {

        this.#container = containerUsers;

    };

    async getUsers () {

        const DATA = await this.#container.getAll();

        if (!DATA) return DATA;

        return DATA;

    };
    /**
     * @param {String} id 
     * @returns {Promise<UserLike>}
     */
    async getUser (id) {

        if (!id) throw `El ID es requerido.`;

        const USER = await this.#container.getOne(id.trim());

        if (!USER) return null;

        return USER;

    };
    /**
     * @param {User<Like>} newUser 
     * @returns {Promise<UserLike>}
     */
    async addUser (newUser) {

        const 

        VALIDATE_USER = await userValidation(newUser),
        VERIFY_USER   = await this.#container.findByProp({user: newUser.user});

        if (VERIFY_USER) return null;

        VALIDATE_USER.id = generateID();

        const ADD_USER = await this.#container.save(VALIDATE_USER);

        if (!ADD_USER) return ADD_USER;

        return ADD_USER

    };
    /**
     * @param {String} id 
     * @param {User<Like>} updateToUser 
     * @returns {Promise<UserLike>}
     */
    async updateUser (id, updateToUser) {

        if (!id) throw "El ID es necesario.";
        if (!updateToUser) throw "Se necesita un Usuario a Actualizar.";

        const UPDATED_USER = await this.#container.putOne(id, updateToUser);

        if (!UPDATED_USER) return UPDATED_USER;

        return UPDATED_USER;

    };
    /**
     * @param {String} id 
     * @param {User<Like>} updateToUser 
     * @returns {Promise<UserUpdated>}
     */
    async updateUserData (id, updateToUser) {

        if (!id) throw "El ID es necesario.";
        if (!updateToUser) throw "Se necesita un Usuario a Actualizar.";

        const UPDATED_USER = await this.#container.patchOne(id.trim(), updateToUser);

        if (!UPDATED_USER) return UPDATED_USER;

        return UPDATED_USER;

    };
    /**
     * @param {String} id 
     * @returns {Promise<UserErased>}
     */
    async deleteUser (id) {

        if (!id) throw `El ID es requerido.`;

        const ERASE_USER = await this.#container.deleteOne(id.trim());

        if (!ERASE_USER) return ERASE_USER;

        return ERASE_USER;

    };
    /**
     * @param {String} userUsername
     * @param {String} passUser 
     * @returns {User<Like>}
     */
    async authUser (userUsername, passUser) {

        if (!userUsername || !passUser) 
            throw "El Nombre de Usuario y Contraseña son requeridos.";

        const 
        
        QUERY_USER = {user: userUsername},
        USER       = await this.#container.findByProp(QUERY_USER);

        if (!USER) return USER;

        const {pass: passCrypt} = USER;
        const PASSWORD = await verifyPassword(passUser, passCrypt);

        if (!PASSWORD) throw "Contraseña Invalida.";

        return USER;

    };

};

export const USERS = new ContainerUsers();