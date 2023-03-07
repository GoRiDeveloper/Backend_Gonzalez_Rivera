import {FIRESTORE_DB} from "../../config/clients/firestore_client/firestore_client.js";
import ErrDelete from "../../server/errors/error_delete.js";
import ErrSave from "../../server/errors/error_save.js";
import ErrThereIsNoData from "../../server/errors/error_there_is_no_data.js";

export default class FirestoreContainer {

    #collection
    /**
     * @param {String} nameCollection 
     */
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
    /**
    * @param {Object} obj 
    * @returns {Object}
    */
    async save (obj) {

        const ID = obj.id;

        delete obj.id;

        const SAVE = await this.#collection.doc(ID).set(obj);

        if (!SAVE) throw new ErrSave(obj);

        obj.id = ID;

        return obj;

    };

    async getAll () {

        const 

        SNAPSHOT = await this.#collection.get(),
        RESULT   = [];

        SNAPSHOT.forEach(doc => RESULT.push(this.asObj(doc)));

        if (RESULT.length === 0) throw new ErrThereIsNoData();

        return RESULT;

    };
    /**
    * @param {String} id 
    * @returns {Object}
    */
    async getOne (id) {

        const

        ITEM = await this.#collection.doc(id).get(),
        OBJ  = this.asObj(ITEM);

        if (!ITEM.exists || Object.keys(OBJ).length <= 1) throw new ErrThereIsNoData();

        return OBJ;

    };
    /**
     * @param {*} username 
     * @returns {Object}
     */
    async findUser (username) {

        const 

        ITEM   = await this.#collection.where("username", "==", username).get(),
        RESULT = [];

        if (ITEM.empty) throw ErrThereIsNoData();

        ITEM.forEach(doc => RESULT.push(this.asObj(doc)));

        if (RESULT.length === 0) throw ErrThereIsNoData();

        return RESULT[0];

    };
    /**
     * @param {Object} obj 
     * @returns {Object}
     */
    async updateOne (obj) {

        const 

        UPDATE = await this.#collection.doc(obj.id).set(obj),
        ITEM   = await this.#collection.doc(obj.id).get(),
        PROD   = this.asObj(ITEM);

        if (!UPDATE || Object.keys(PROD).length <= 1) throw new ErrThereIsNoData();

        return PROD;

    };
    /**
     * @param {String} id 
     * @param {Object} obj 
     * @returns {Object}
     */
    async patchOne (id, obj) {

        const 

        //UPDATE = await this.#collection.doc(id).set(obj, { merge: true }),
        UPDATE = await this.#collection.doc(id).update(obj),
        ITEM   = await this.#collection.doc(id).get(),
        PROD   = this.asObj(ITEM);

        if (!UPDATE || Object.keys(PROD).length <= 1) throw ErrThereIsNoData();

        return PROD;

    };
    /**
     * @param {String} id 
     * @returns {Object}
     */
    async deleteOne (id) {

        const 

        ITEM      = await this.#collection.doc(id).get(),
        TO_ERASED = this.asObj(ITEM),
        DELETE    = await this.#collection.doc(id).delete();

        if (!DELETE) throw ErrDelete();

        return TO_ERASED;

    };

};