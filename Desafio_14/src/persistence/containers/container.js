import { promises } from "fs";

const FS = promises;

export class Container {

    #file
    #container

    constructor (file) {

        this.#file = file;
        this.#container = [];

    };

    async save (obj) {

        this.#container = [];

        const DATA = await this.getAll();

        if (DATA) this.#container.push(...DATA);

        this.#container.push(obj);

        try {

            await FS.writeFile(

                this.#file,
                JSON.stringify(

                    this.#container,
                    null,
                    "\t"
                
                )

            );

        } catch (err) {

            return null;

        };

        return obj;

    };

    async getAll () {

        const DATA = await FS.readFile(this.#file, "utf-8");

        if (!DATA) return null;
        if (DATA.length === 0) return null;

        return JSON.parse(DATA);

    };

    async getOne (id) {

        const DATA = await this.getAll();

        if (!DATA) return null;

        const ITEM = DATA.find(item => item.id === id);

        if (!ITEM) return null;

        return ITEM;

    };

    async findUser (username) {

        const DATA = await this.getAll();

        if (!DATA) return null;

        const ITEM = DATA.find(item => item.username === username);

        if (!ITEM) return null;

        return ITEM;

    };

    async updateOne (obj) {

        const DATA = await this.getAll();

        if (!DATA) return null;

        const INDEX = DATA.findIndex(item => item.id === obj.id);

        if (INDEX === -1) return null;

        this.#container = [];
        this.#container.push(...DATA);
        this.#container[INDEX] = obj;

        try {
            
            await FS.writeFile(
                
                this.#file,
                JSON.stringify(

                    this.#container,
                    null,
                    "\t"

                )
                
            );

            return this.#container[INDEX];

        } catch (err) {

            return null;  

        };

    };

    async patchOne (id, obj) {

        const DATA = await this.getAll();

        if (!DATA) return null;

        const INDEX = DATA.findIndex(item => item.id === id);

        if (INDEX === -1) return null;

        this.#container = [];
        this.#container.push(...DATA);
        
        const TO_UPDATE = this.#container[INDEX];

        try {

            await Object.assign(TO_UPDATE, obj);
            await FS.writeFile(
                
                this.#file,
                JSON.stringify(

                    this.#container,
                    null,
                    "\t"

                )
                
            );

            return TO_UPDATE;
            
        } catch (err) {

            return null;

        };

    };

    async deleteOne (id) {

        const DATA = await this.getAll();

        if (!DATA) return null;

        const INDEX = DATA.findIndex(item => item.id === id);

        if (INDEX === -1) return null;

        this.#container = [];
        this.#container.push(...DATA);

        const ERASED = this.#container.splice(INDEX, 1);

        try {

            await FS.writeFile(

                this.#file,
                JSON.stringify(

                    this.#container,
                    null,
                    "\t"

                )

            );

            return ERASED;
            
        } catch (err) {

            return null;

        };

    };

};