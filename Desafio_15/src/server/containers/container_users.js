import {randomUUID as generateID} from "crypto";
import { containerUsers } from "../../persistence/containers/switch_container.js";
import { verifyPassword } from "../../config/password.js";
import userValidation from "../models/validations/users_validations.js";
import ErrIDNotFound from "../errors/error_id_not_found.js";
import ErrUserExists from "../errors/error_user_exists.js";
import ErrUpdate from "../errors/error_update.js";
import ErrPassword from "../errors/error_password.js";
import ErrUserAndPass from "../errors/error_user_and_pass.js";

class ContainerUsers {

    #container 

    constructor () {

        this.#container = containerUsers;

    };

    async getUsers () {

        return DATA = await this.#container.getAll();

    };
    /**
     * @param {String} id 
     * @returns {Promise<UserLike>}
     */
    async getUser (id) {

        if (!id) throw new ErrIDNotFound(id);

        return await this.#container.getOne(id.trim());

    };
    /**
     * @param {User<Like>} newUser 
     * @returns {Promise<UserLike>}
     */
    async addUser (newUser) {

        const 

        VALIDATE_USER = await userValidation(newUser),
        VERIFY_USER   = await this.#container.findByProp({user: newUser.user});

        if (VERIFY_USER) throw new ErrUserExists(newUser.user);

        VALIDATE_USER.id = generateID();

        return await this.#container.save(VALIDATE_USER);

    };
    /**
     * @param {String} id 
     * @param {User<Like>} updateToUser 
     * @returns {Promise<UserLike>}
     */
    async updateUser (id, updateToUser) {

        if (!id) throw new ErrIDNotFound(id);
        if (!updateToUser) throw new ErrUpdate(id);

        return await this.#container.putOne(id, updateToUser);

    };
    /**
     * @param {String} id 
     * @param {User<Like>} updateToUser 
     * @returns {Promise<UserUpdated>}
     */
    async updateUserData (id, updateToUser) {

        if (!id) throw new ErrIDNotFound(id);
        if (!updateToUser) throw new ErrUpdate(id);

        return await this.#container.patchOne(id.trim(), updateToUser);
    };
    /**
     * @param {String} id 
     * @returns {Promise<UserErased>}
     */
    async deleteUser (id) {

        if (!id) throw new ErrIDNotFound(id);

        return await this.#container.deleteOne(id.trim());

    };
    /**
     * @param {String} userUsername
     * @param {String} passUser 
     * @returns {User<Like>}
     */
    async authUser (userUsername, passUser) {

        if (!userUsername || !passUser) throw new ErrUserAndPass();

        const 
        
        QUERY_USER        = {user: userUsername},
        USER              = await this.#container.findByProp(QUERY_USER),
        {pass: passCrypt} = USER,
        PASSWORD          = await verifyPassword(passUser, passCrypt);

        if (!PASSWORD) throw new ErrPassword();

        return USER;

    };

};

export const USERS = new ContainerUsers();