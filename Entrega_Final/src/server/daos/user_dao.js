import { getKey, getValue } from "../utils/object_utils.js";
import ErrIdNotFound from "../models/errors/error_id_not_found.js";
import ErrUserAlreadyExists from "../models/errors/error_user_already_exists.js";

export class UserDAO {

    #persistence;

    constructor (daoPersistence) {

        this.#persistence = daoPersistence;

    };

    async getUsers () {

        return await this.#persistence.getAll();

    };

    async getUser (id) {

        const ID = id.trim();

        if (!ID) throw new ErrIdNotFound(ID);

        return await this.#persistence.getOne(id);

    };

    async findByUserProp (prop, error) {

        const 
        
        KEY   = getKey(prop, 0),
        VALUE = getValue(prop, 0),
        QUERY = { [KEY]: VALUE };

        return await this.#persistence.findByProp(QUERY, { filter: false, error });

    };

    async addUser (user) {

        const 
        
        QUERY_PROP = { email: user.email },
        EXISTS     = await

            this.findByUserProp(
                QUERY_PROP, 
                { error: false }
            );

        if (EXISTS) throw new ErrUserAlreadyExists(EXISTS.email);

        return await this.#persistence.save(user);

    };

    async updateUser (id, userToUpdate) {

        const ID = id.trim();

        if (!ID) throw new ErrIdNotFound(ID);

        return await this.#persistence.updateOne(ID, userToUpdate);

    };

    async updateUserData (id, dataToUpdate) {

        const ID = id.trim();

        if (!ID) throw new ErrIdNotFound(ID);

        return await this.#persistence.patchOne(ID, dataToUpdate);

    };

    async deleteUser (id) {

        const ID = id.trim();

        if (!ID) throw new ErrIdNotFound(ID);

        return await this.#persistence.deleteOne(ID);

    };

};