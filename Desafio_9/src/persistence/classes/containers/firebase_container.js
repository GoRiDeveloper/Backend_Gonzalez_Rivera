import { FIRESTOREDB } from "../../config/clients/firestore_client.js";
import { asObj } from "../../../functions/functions.js"

export class FirebaseContainer {

    #collection

    constructor (nameCollection) {

        this.#collection = FIRESTOREDB.collection(nameCollection);

    };

    async save (obj) {

        const ID = obj.id;

        delete obj.id;

        const SAVE = await this.#collection.doc(ID).set(obj);

        return obj;

    };

    async getAll () {

        const SNAPSHOT = await this.#collection.get(),
                RESULT = [];

        SNAPSHOT.forEach(doc => {

            RESULT.push(asObj(doc));

        });

        if (RESULT.length === 0) return null;
        
        return RESULT;

    };

    async getOne (criterion) {

        const ITEM = await this.#collection.doc(criterion).get(),
              PROD = asObj(ITEM);

        if (Object.keys(PROD).length < 1) return null;

        return PROD;

    };

    async updateOne (obj) {

        const UPDATE = await this.#collection.doc(obj.id).set(obj),
                ITEM = await this.#collection.doc(obj.id).get(),
                PROD = asObj(ITEM);

        return PROD;

    };

    async deleteOne (criterion) {

        const ITEM = await this.#collection.doc(criterion).get(),
         TO_ERASED = asObj(ITEM),
            DELETE = await this.#collection.doc(criterion).delete();
        
        return TO_ERASED;

    };

};