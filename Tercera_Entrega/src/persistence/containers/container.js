import {writeFile, readFile} from "fs/promises";

export default class Container {

    #file
    #container

    constructor (file) {

        this.#file      = file;
        this.#container = [];

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

            return null;
            
        };

    };

    async getAll () {

        const DATA = await readFile(this.#file, "utf-8");

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

            await writeFile(

                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );

            return this.#container[INDEX];

        } catch (e) {

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
            await writeFile(

                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );
            console.log(TO_UPDATE);
            return this.#container[INDEX];
            
        } catch (e) {

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

            await writeFile(

                this.#file,
                JSON.stringify(this.#container, null, "\t")

            );

            return ERASED;
            
        } catch (e) {

            return null;  

        };

    };

};