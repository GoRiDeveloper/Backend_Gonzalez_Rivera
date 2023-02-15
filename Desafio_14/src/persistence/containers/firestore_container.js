import { FIRESTORE_DB } from "../../config/clients/firestore_client/firestore_client.js";

export class FirestoreContainer {

    #collection

    constructor (nameCollection) {

        this.#collection = FIRESTORE_DB.collection(nameCollection);

    };

    asObj (ref) {

        const OBJ = {

            id: ref.id,
            ...ref.data()

        };

        return OBJ;

    };

    async save (obj) {

        const ID = obj.id;

        delete obj.id;

        const SAVE = await this.#collection.doc(ID).set(obj);

        if (!SAVE) return null;

        obj.id = ID;

        return obj;

    };

    async getAll () {

        const

        SNAPSHOT = await this.#collection.get(),
        RESULT   = [];

        SNAPSHOT.forEach(doc => {

            RESULT.push(this.asObj(doc));

        });

        if (RESULT.length === 0) return null;

    };

    async getOne (id) {

        const

        ITEM = await this.#collection.doc(id).get(),
        OBJ  = this.asObj(ITEM);

        if (!ITEM.exists || Object.keys(OBJ).length <= 1) return null;

        return OBJ;

    };

    async findUser (username) {

        const 

        ITEM   = await this.#collection.where("username", "==", username).get(),
        RESULT = [];

        if (ITEM.empty) return null;

        ITEM.forEach(doc => RESULT.push(this.asObj(doc)));

        if (RESULT.length === 0) return null;
        
        return RESULT[0];

    };

    async updateOne (obj) {

        const

        UPDATE = await this.#collection.doc(obj.id).set(obj),
        ITEM   = await this.#collection.doc(obj.id).get(),
        PROD   = this.asObj(ITEM);

        if (!UPDATE || Object.keys(PROD).length <= 1) return null;

        return PROD;

    };

    async patchOne (id, obj) {

        const 

        //UPDATE = await this.#collection.doc(id).set(obj, { merge: true }),
        UPDATE = await this.#collection.doc(id).update(obj),
        ITEM   = await this.#collection.doc(id).get(),
        PROD   = this.asObj(ITEM);

        if (!UPDATE || Object.keys(PROD).length <= 1) return null;

        return PROD;

    };

    async deleteOne (id) {

        const

        ITEM      = await this.#collection.doc(id).get(),
        TO_ERASED = this.asObj(ITEM),
        DELETE    = await this.#collection.doc(id).delete();

        if (!DELETE) return null;

        return TO_ERASED;

    };

};