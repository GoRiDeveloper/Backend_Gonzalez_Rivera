import { MDB } from "../../config/clients/mongodb_client.js";

export class MongoDBContainer {

    #collection
       
    constructor (nameCollection) {

        this.#collection = MDB.collection(nameCollection);

    };

    async save (obj) {

        obj._id = obj.id;
        delete obj.id;

        const SAVE = await this.#collection.insertOne(obj);

        if (!SAVE) return SAVE;

        return obj;

    };

    async getAll () {

        const DATA = await this.#collection.find().toArray();

        if (!DATA) return DATA;
        if (DATA.length === 0) return null;

        return DATA;

    };

    async getOne (criterion) {

        const OBJ = await this.#collection.findOne({ _id: criterion });

        if (!OBJ) return null;

        return OBJ;

    };

    async updateOne (obj) {

        const { _id } = obj;

        const QUERY = { _id },
             UPDATE = await this.#collection.updateOne(QUERY, { $set: obj }),
               ITEM = await this.#collection.findOne(QUERY);

        return ITEM;

    };

    async deleteOne (criterion) {

        const TO_ERASED = await this.#collection.findOne({ _id: criterion });

        if (!TO_ERASED) return null;

        const ERASED = await this.#collection.deleteOne({ _id: criterion });

        if (!ERASED) return null;

        return TO_ERASED;

    };

    async specificUpdate () {



    };

};