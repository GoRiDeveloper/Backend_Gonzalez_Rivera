import {writeFile, readFile} from "fs/promises";
import { getKey } from "../../../config/config.js";
import ErrSave from "../../../server/errors/error_save.js";
import ErrRead from "../../../server/errors/error_could_not_read_file.js";
import ErrCouldNotGet from "../../../server/errors/error_could_not_get.js";
import ErrIDNotFound from "../../../server/errors/error_id_not_found.js";
import ErrProps from "../../../server/errors/error_props.js";

export default class DaoFile {

    #file
    #container
    /**
     * @param {String} file 
     */
    constructor (file) {
        this.#file      = file;
        this.#container = [];
    };
    /**
     * @param {Number} index 
     */
    verifyIndex (index) {

        if (index === -1) throw new ErrRead();

    };
    /**
     * @param {Object} obj 
     * @returns {Promise}
     */
    async save (obj) {

        this.#container = [];

        const DATA = await this.getAll();

        if (DATA) this.#container.push(...DATA);

        this.#container.push(obj);

        try {

            await writeFile(
                
                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );
            return obj;
            
        } catch (e) {
            throw new ErrSave(obj);            
        };

    };
    /**
     * @returns {¿<Array>}
     */
    async getAll () {

        let getData;

        try {
            getData = await readFile(this.#file, "utf-8");
        } catch (e) {
            throw new ErrRead();
        };

        if (!getData) throw new ErrCouldNotGet();

        return JSON.parse(getData);

    };
    /**
     * @param {String} id 
     * @returns {Object}
     */
    async getOne (id) {

        const 
        
        DATA = await this.getAll(),
        ITEM = DATA.find(item => item.id === id);

        if (!ITEM) throw new ErrIDNotFound(id);

        return ITEM;

    };
    /**
     * @param {Object} prop 
     * @param {Boolean} param1 
     * @returns 
     */
    async findByProp (prop, { error }) {

        const 
        
        KEY  = getKey(prop, 0),
        DATA = await this.getAll(),
        ITEM = DATA.find(item => item[KEY] === prop[KEY]);

        if (!error) return ITEM;
        if (!ITEM) throw new ErrProps(prop);

        return ITEM;

    };
    /**
     * @param {String} id 
     * @param {Object} obj 
     * @returns {Promise<ObjectUpdated>}
     */
    async updateOne (id, obj) {

        const 
        
        DATA  = await this.getAll(),
        INDEX = DATA.findIndex(item => item.id === id);

        this.verifyIndex(INDEX);
        this.#container = [];
        this.#container.push(...DATA);
        this.#container[INDEX] = obj;

        try {

            await writeFile(

                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );
            return this.#container[INDEX];

        } catch (e) {
            throw new ErrRead();
        };

    };
    /**
     * @param {String} id 
     * @param {Object} obj 
     * @returns {Promise<ObjectUpdated>}
     */
    async patchOne (id, obj) {

        const 

        DATA  = await this.getAll(),
        INDEX = DATA.findIndex(item => item.id === id);

        this.verifyIndex(INDEX);        
        this.#container = [];
        this.#container.push(...DATA);

        const TO_UPDATE = this.#container[INDEX];

        try {

            Object.assign(TO_UPDATE, obj);
            await writeFile(

                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );
            return TO_UPDATE;
            
        } catch (e) {
            throw new ErrRead();
        };

    };
    /**
     * @param {String} id 
     * @returns {Promise<DeletedObject>}
     */
    async deleteOne (id) {

        const 

        DATA  = await this.getAll(),
        INDEX = DATA.findIndex(item => item.id === id);

        this.verifyIndex(INDEX);
        this.#container = [];
        this.#container.push(...DATA);

        const ERASED = this.#container.splice(INDEX, 1);

        try {

            await writeFile(

                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );
            return ERASED;
            
        } catch (e) {
            throw new ErrRead();  
        };

    };

};