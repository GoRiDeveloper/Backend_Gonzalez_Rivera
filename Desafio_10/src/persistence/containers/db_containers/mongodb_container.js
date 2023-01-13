import { MDB } from "../../config/clients/mongodb_client/mongodb_client.js";

export class MongoDBContainer {

    #collection

    constructor (nameCollection) {

        this.#collection = MDB.collection(nameCollection);

    };

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

    async getOne (id) {

        const 
        
        QUERY = { _id: id }
        OBJ = await this.#collection.findOne(QUERY);

        if (!OBJ) return null;

        return OBJ;

    };

    async updateOne (obj) {

        const 
        
        { _id } = obj,
        QUERY = { _id },
        UPDATE = await this.#collection.findOneAndUpdate(QUERY, obj, { new: true });

        if (!UPDATE) return null;

        return UPDATE;

    };

    async deleteOne (id) {

        const 

        QUERY = { _id: id },
        DELETE = await this.#collection.findOneAndDelete(QUERY);

        if (!DELETE) return null;

        return DELETE;

    };

}; 