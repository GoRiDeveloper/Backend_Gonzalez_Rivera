import ErrCouldNotGet from "../../models/errors/error_could_not_get.js";
import ErrIDNotFound from "../../models/errors/error_id_not_found.js";
import ErrProps from "../../models/errors/error_props.js";
import ErrSave from "../../models/errors/error_save.js";
import ErrUpdate from "../../models/errors/error_update.js";
import ErrDelete from "../../models/errors/error_deleted.js";

export class MongoDBDao {

    #client;
    #collection;

    constructor ({ client, collection }) {

        this.#client     = client;
        this.#collection = this.#client.collection(collection);

    };

    async save (obj) {

        obj._id = obj.id;
        delete obj.id;

        const SAVE = await this.#collection.insertOne(obj);

        if (!SAVE.insertedId) throw new ErrSave(obj);

        return obj;

    };

    async getAll () {

        const DATA = await this.#collection.find().toArray();

        if (!DATA) throw new ErrCouldNotGet();

        return DATA;

    };

    async getOne (_id) {

        const 
        
        QUERY = { _id },
        OBJ   = await this.#collection.findOne(QUERY);

        if (!OBJ) throw new ErrIDNotFound(_id);

        return OBJ;

    };

    async findByProp (prop, { filter, error }) {

        let items;

        filter
            ? items = await this.#collection.find(prop).toArray()
            : items = await this.#collection.findOne(prop);

        if (!items && error) throw new ErrProps(prop);

        return items;

    };

    async updateOne (_id, obj) {

        const 

        QUERY  = { _id },
        UPDATE = await this.#collection
                                .findOneAndUpdate(

                                    QUERY, 
                                    { $set: obj }, 
                                    { returnDocument: "after" }

                                );

        if (!UPDATE.value) throw new ErrUpdate(_id);

        return UPDATE.value;

    };

    async patchOne (_id, obj, options) {

        const 

        QUERY  = { _id },
        UPDATE = await this.#collection
                                .findOneAndUpdate(

                                    QUERY,
                                    { $set: obj },
                                    {
                                        returnDocument: "after",
                                        ...(options && options)
                                    }
                                );

        if (!UPDATE.value) throw new ErrUpdate(_id);

        return UPDATE.value;

    };

    async deleteOne (_id, pullQuery) {

        let deleted;
        const QUERY = { _id };

        pullQuery

            ? deleted = await this.#collection.update(QUERY, pullQuery)
            : deleted = await this.#collection.findOneAndDelete(QUERY);
        
        if (!deleted || !deleted?.value) throw new ErrDelete(_id);

        return deleted;

    };

};