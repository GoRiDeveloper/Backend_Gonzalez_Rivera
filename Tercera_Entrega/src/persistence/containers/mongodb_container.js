import mdb from "../../config/clients/mongodb_client/mongodb_client.js";

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

        if (!SAVE) return null;

        return obj;

    };

    async getAll () {

        const DATA = await this.#collection.find().toArray();

        if (!DATA) return null;
        if (DATA.length === 0) return null;

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

        if (!OBJ) return null;

        return OBJ;

    };
    /**
     * @returns {Promise}
     */
    async findByProp (prop) {

        const OBJ = await this.#collection.findOne(prop);

        if (!OBJ) return null;

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

        if (!UPDATE) return null;

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

        if (!UPDATE) return null;

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

        if (!DELETE) return null;

        return DELETE;

    };

};