import { writeFile, readFile } from "fs/promises";
import { getKey, getValue } from "../../utils/object_utils.js";
import { verifyIndex } from "../../utils/verify_index.js";
import ErrRead from "../../models/errors/error_could_not_read.js";
import ErrSave from "../../models/errors/error_save.js";
import ErrProps from "../../models/errors/error_props.js";
import ErrIdNotFound from "../../models/errors/error_id_not_found.js";

export class FileDao {

    #file;
    #container;

    constructor (file) {

        this.#file      = file;
        this.#container = [];

    };

    async save (obj) {

        this.#container.length = 0;

        const DATA = await this.getAll();

        if (DATA.length !== 0) this.#container.push(...DATA);

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

    async getAll () {

        let getData;

        try {

            getData = await readFile(this.#file, "utf-8"); 

        } catch (e) {

            throw new ErrRead();

        };

        return JSON.parse(getData);

    };

    async getOne (id) {

        const 
        
        DATA = await this.getAll(),
        ITEM = DATA.find(item => item.id === id);

        if (!ITEM) throw new ErrIdNotFound(id);

        return ITEM;

    };

    async findByProp (prop, { filter, error }) {

        let items;

        const

        KEY   = getKey(prop, 0),
        VALUE = getValue(prop, 0),
        DATA  = await this.getAll();

        filter
            ? items = DATA.filter(item => item[KEY] === VALUE)
            : items = DATA.find(item => item[KEY] === VALUE);

        if (!error) return items;
        if (!items) throw new ErrProps(prop);

        return items;

    };

    async updateOne (id, obj) {

        const

        DATA  = await this.getAll(),
        INDEX = DATA.findIndex(item => item.id === id);

        verifyIndex(INDEX);
        this.#container.length = 0;
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

    async patchOne (id, obj) {

        const

        DATA  = await this.getAll(),
        INDEX = DATA.findIndex(item => item.id === id);

        verifyIndex(INDEX);
        this.#container.length = 0;
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

    async deleteOne (id) {

        const

        DATA  = await this.getAll(),
        INDEX = DATA.findIndex(item => item.id === id);

        verifyIndex(INDEX);
        this.#container.length = 0;
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