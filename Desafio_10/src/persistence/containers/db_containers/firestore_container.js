import { FIRESTORE_DB } from "../../config/clients/firestore_client/firestore_client.js";
import { asObj } from "../../functions/functions_persistence.js";

export class FirestoreContainer {

    #collection

    constructor (nameCollection) {

        this.#collection = FIRESTORE_DB.collection(nameCollection);

    };

    async save (obj) {

        const ID = obj.id;

        delete obj.id;

        const SAVE = await this.#collection.doc(ID).set(obj);

        if (!SAVE) return null;

        return obj;

    };

    async getAll () {

        const 

        SNAPSHOT = await this.#collection.get(),
        RESULT   = [];

        SNAPSHOT.forEach(doc => {

            RESULT.push(asObj(doc));

        });

        if (RESULT.length === 0) return null;

        return RESULT;

    };

    async getOne (id) {

        const

        ITEM = await this.#collection.doc(id).get(),
        PROD = asObj(ITEM);

        if (Object.keys(PROD).length < 1) return null;

        return PROD;

    };

    async updateOne (obj) {

        const 

        UPDATE = await this.#collection.doc(obj.id).set(obj),
        ITEM   = await this.#collection.doc(obj.id).get(),
        PROD   = asObj(ITEM);

        if (Object.keys(PROD).length < 1) return null;

        return PROD;

    };

    async deleteOne (id) {

        const

        ITEM      = await this.#collection.doc(id).get(),
        TO_ERASED = asObj(ITEM),
        DELETE    = await this.#collection.doc(id).delete();

        if (!DELETE) return null;

        return TO_ERASED;

    };

};