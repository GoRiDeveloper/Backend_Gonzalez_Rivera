import {writeFile, readFile} from "fs/promises";
import ErrSave from "../../server/errors/error_save.js";
import ErrRead from "../../server/errors/error_could_not_read_file.js";
import ErrCouldNotGet from "../../server/errors/error_could_not_get.js";
import ErrThereIsNoData from "../../server/errors/error_there_is_no_data.js";
import ErrIDNotFound from "../../server/errors/error_id_not_found.js";
import ErrProps from "../../server/errors/error_props.js";

export default class Container {

    #file
    #container

    constructor (file) {
        this.#file      = file;
        this.#container = [];
    };

    verifyIndex (index) {

        if (index === -1) throw new ErrRead();

    };

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

    async getAll () {

        try {

            const DATA = await readFile(this.#file, "utf-8");

            if (!DATA) throw new ErrCouldNotGet();
            if (DATA.length === 0) throw new ErrThereIsNoData();

            return JSON.parse(DATA);

        } catch (e) {

            throw new ErrRead();

        };

    };

    async getOne (id) {

        const 
        
        DATA = await this.getAll(),
        ITEM = DATA.find(item => item.id === id);

        if (!ITEM) throw new ErrIDNotFound(id);

        return ITEM;

    };

    async findByProp (prop) {

        const 
        
        PROP_VALUE = Object.keys(prop)[0],
        DATA       = await this.getAll(),
        ITEM       = DATA.find(item => item[PROP_VALUE] === PROP_VALUE);

        if (!ITEM) throw new ErrProps(prop);

        return ITEM;

    };

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
            return this.#container[INDEX];
            
        } catch (e) {

            throw new ErrRead();

        };

    };

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