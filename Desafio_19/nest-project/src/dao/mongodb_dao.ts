import { MDB } from "../config/mongo_client/mongo_client";

export class DaoMongoDB {

    #collection: any
    /**
     * @param {String} nameCollection 
     */
    constructor (nameCollection: string) {

        this.#collection = MDB.collection(nameCollection);

    };
    /**
     * @param {Object} obj 
     * @returns {Promise}
     */
    async save (obj: any): Promise<any> {

        obj._id = obj.id;
        delete obj.id;

        const SAVE = await this.#collection.insertOne(obj);

        if (!SAVE) throw new Error('No se pudo guardar.');

        return obj;

    };

    async getAll () {

        const DATA = await this.#collection.find().toArray();

        if (!DATA) throw new Error('No se pudo leer la BD.');
        //if (DATA.length === 0) throw new Error('No hay Información.');

        return DATA;

    };
    /**
     * @param {String} id 
     * @returns {Object}
     */
    async getOne (_id: string): Promise<any> {

        const

        QUERY = { _id },
        OBJ   = await this.#collection.findOne(QUERY);

        if (!OBJ) 
            throw new Error(`No se encontro la información con el ID: '${_id}'.`);

        return OBJ;

    };
    /**
     * @returns {Promise}
     */
    async findByProp (prop: object, error: boolean): Promise<any> {

        const OBJ = await this.#collection.findOne(prop);

        if (!error) return OBJ;
        if (!OBJ) throw new Error(`No se encontró por la propiedad: '${prop}'`);

        return OBJ;

    };
    /**
     * @param {String} id 
     * @param {Object} obj 
     * @param {Object<optional>} options
     * @returns {Promise}
     */
    async patchOne (_id: string, obj: any, options?: object): Promise<any> {

        const

        QUERY  = { _id },
        UPDATE = await this.
                        #collection.
                        findOneAndUpdate(

                            QUERY, 
                            { $set: obj }, 
                            {
                                new: true, 
                                ...(options && options)
                            }

                        );

        if (!UPDATE) 
            throw new Error(`No se pudo actualizar la información con el ID: '${_id}'.`);

        return UPDATE.value;

    };
    /**
     * @param {String} id 
     * @returns {Promise}
     */
    async deleteOne (_id: string, pullQuery?: object): Promise<any> {

        let deleted = undefined;
        const QUERY = { _id };

        pullQuery
        
            ? deleted = await this.#collection.update(QUERY, pullQuery)
            : deleted = await this.#collection.findOneAndDelete(QUERY);

        if (!deleted) 
            throw new Error(`No se pudo eliminar la información con el ID: '${_id}'.`);

        return deleted;

    };

};