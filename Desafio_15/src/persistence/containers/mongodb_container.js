import mdb from "../../config/clients/mongodb_client/mongodb_client.js";
import ErrSave from "../../server/errors/error_save.js";
import ErrCouldNotGet from "../../server/errors/error_could_not_get.js";
import ErrThereIsNoData from "../../server/errors/error_there_is_no_data.js";
import ErrIDNotFound from "../../server/errors/error_id_not_found.js";
import ErrProps from "../../server/errors/error_props.js";
import ErrUpdate from "../../server/errors/error_update.js";
import ErrDelete from "../../server/errors/error_delete.js";

export default class MongoDBContainer {

    #collection
    /**
     * @param {String} nameCollection 
     */
    constructor (nameCollection) {

        this.#collection = mdb.collection(nameCollection);

    };
    /**
     * @param {Object} obj 
     * @returns {Promise}
     */
    async save (obj) {

        obj._id = obj.id;
        delete obj.id;

        const SAVE = await this.#collection.insertOne(obj);

        if (!SAVE) throw new ErrSave(obj);

        return obj;

    };

    async getAll () {

        const DATA = await this.#collection.find().toArray();

        if (!DATA) throw new ErrCouldNotGet();
        if (DATA.length === 0) throw new ErrThereIsNoData;

        return DATA;

    };
    /**
     * @param {String} id 
     * @returns {Object}
     */
    async getOne (_id) {

        const

        QUERY = { _id },
        OBJ   = await this.#collection.findOne(QUERY);

        if (!OBJ) throw new ErrIDNotFound(_id);

        return OBJ;

    };
    /**
     * @returns {Promise}
     */
    async findByProp (prop) {

        const OBJ = await this.#collection.findOne(prop);

        if (!OBJ) throw new ErrProps(prop);

        return OBJ;

    };
    /**
     * @param {Object} obj 
     * @returns {Promise}
     */
    async putOne (_id, obj) {

        const 

        QUERY   = { _id },
        UPDATE  = await this.#collection.findOneAndUpdate(QUERY, { $set: obj }, { new: true });

        if (!UPDATE) throw new ErrUpdate(_id);

        return UPDATE.value;

    };
    /**
     * @param {String} id 
     * @param {Object} obj 
     * @param {Object<optional>} options
     * @returns {Promise}
     */
    async patchOne (_id, obj, options) {

        const

        QUERY  = { _id },
        UPDATE = await this.#collection.findOneAndUpdate(QUERY, { $set: obj }, {new: true, ...(options && options)});

        if (!UPDATE) throw new ErrUpdate(_id);

        return UPDATE.value;

    };
    /**
     * @param {String} id 
     * @returns {Promise}
     */
    async deleteOne (_id) {

        const

        QUERY  = { _id },
        DELETE = await this.#collection.findOneAndDelete(QUERY);

        if (!DELETE) throw new ErrDelete(_id);

        return DELETE;

    };

};