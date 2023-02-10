import { randomUUID as generateID } from "crypto";
import { userValidation } from "../../functions/server_functions/server_functions.js";
import { containerUsers } from "../../persistence/containers/switch_container.js";
import { verifyPassword } from "../../persistence/config/password.js";
import { validationError } from "../models/error_model.js";

class UsersContainer {

    #container

    constructor () {

        this.#container = containerUsers;

    };

    async getUsers () {

        const DATA = await this.#container.getAll();

        if (!DATA) return DATA;

        return DATA;

    };

    async getUser (id) {

        const USER = await this.#container.getOne(id.trim());

        if (!USER) return null;

        return USER;

    };

    async postUser (user) {

        const 
        
        NEW_USER = await userValidation(user),
        USER     = await this.#container.findUser(user.username);

        if (USER) return null;

        NEW_USER.id = generateID();

        const ADD_USER = await this.#container.save(NEW_USER);

        if (!ADD_USER) return ADD_USER;

        return ADD_USER;

    };

    async patchUser (id, updateToUser) {

        const UPDATED_USER = await this.#container.patchOne(id.trim(), updateToUser);

        if (!UPDATED_USER) return UPDATED_USER;

        return UPDATED_USER;

    };

    async deleteUser (id) {

        const ERASE_USER = await this.#container.deleteOne(id.trim());

        if (!ERASE_USER) return ERASE_USER;

        return ERASE_USER;

    };

    async authUser (user, pass) {

        const USER = await this.#container.findUser(user);

        if (!USER) return USER;

        const 
        
        { password } = USER,
        PASSWORD     = await verifyPassword(password);

        if (pass !== PASSWORD) 
            throw validationError(password);

        return USER;

    };
};

export const USERS = new UsersContainer();