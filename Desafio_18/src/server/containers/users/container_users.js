import { randomUUID as generateID } from "crypto";
import { containerUsers } from "../../../persistence/containers/switch_container.js";
import { verifyPassword } from "../../../config/password.js";
import ErrIDNotFound from "../../errors/error_id_not_found.js";
import ErrUserExists from "../../errors/error_user_exists.js";
import ErrUpdate from "../../errors/error_update.js";
import ErrPassword from "../../errors/error_password.js";
import ErrUserAndPass from "../../errors/error_user_and_pass.js";
import Users from "../../models/users/Users.js";
import User from "../../models/users/User.js";

export default class ContainerUsers {

    #container 

    constructor () {

        this.#container = containerUsers;

    };
    /**
     * @returns {Users}
     */
    async getUsers () {

        const USERS = await this.#container.getAll();
        return new Users(USERS);

    };
    /**
     * @param {String} id 
     * @returns {Promise<User>}
     */
    async getUser (id) {

        if (!id || !id.trim()) throw new ErrIDNotFound(id);

        const USER_FIND = await this.#container.getOne(id.trim());
        return new User(USER_FIND);

    };
    /**
     * @param {User} newUser 
     * @returns {Promise<User>}
     */
    async addUser (newUser) {

        newUser.id = generateID();

        const

        USER   = new User(newUser),
        EXISTS = await this.#container.findByProp(
            { user: USER.getUser }, 
            { error: false }
        );

        if (EXISTS) throw new ErrUserExists(USER.getUser);

        return await this.#container.save(await USER.data());

    };
    /**
     * @param {String} id 
     * @param {User} updateToUser 
     * @returns {Promise<UserUpdated>}
     */
    async updateUser (id, updateToUser) {

        if (!id || !id.trim()) throw new ErrIDNotFound(id);
        if (!updateToUser) throw new ErrUpdate(id);

        updateToUser.id = id;
        const USER = new User(updateToUser);

        return await this.#container.updateOne(id, USER.data());

    };
    /**
     * @param {String} id 
     * @param {User} updateToUser 
     * @returns {Promise<UserUpdated>}
     */
    async updateUserData (id, updateToUser) {

        if (!id || !id.trim()) throw new ErrIDNotFound(id);
        if (!updateToUser) throw new ErrUpdate(id);

        const UPDATE = new User.updateValidation(updateToUser);
        return await this.#container.patchOne(id.trim(), UPDATE);
    };
    /**
     * @param {String} id 
     * @returns {Promise<DeletedUser>}
     */
    async deleteUser (id) {

        if (!id || !id.trim()) throw new ErrIDNotFound(id);

        return await this.#container.deleteOne(id.trim());

    };
    /**
     * @param {String} userUsername
     * @param {String} passUser 
     * @returns {User}
     */
    async authUser (userUsername, passUser) {

        if (!userUsername || !passUser) throw new ErrUserAndPass();

        const 
        
        QUERY_USER          = { user: userUsername },
        USER                = await this.#container.findByProp(QUERY_USER, { error: true }),
        { pass: passCrypt } = USER,
        PASSWORD            = await verifyPassword(passUser, passCrypt);

        if (!PASSWORD) throw new ErrPassword();

        return USER;

    };

};