import fs from "fs";

const FS = fs.promises;

export class Container {

    #file
    #container

    constructor (file) {

        this.#file = file;
        this.#container = [];

    };

    async save (obj) {

        this.#container = [];
        this.#container.push(obj);

        await FS.writeFile(

            this.#file, 
            JSON.stringify(

                this.#container, 
                null, 
                "\t"

            ));

        return obj;

    };

    async getAll () {

        const DATA = await FS.readFile(this.#file, "utf-8");
    
        if (!DATA) return null;
        if (DATA.length === 0) return null;

        return JSON.parse(DATA);

    };

    async getOne (criterion) {

        const DATA = await this.getAll();

        if (DATA.length === 0) return null;
        
        const ITEM = DATA.find(items => items.id === criterion);

        if (!ITEM) return ITEM;

        return ITEM;

    };

    async updateOne (obj) {

        const DATA = await this.getAll();

        if (DATA.length === 0) return null;

        const INDEX = DATA.findIndex(items => items.id === obj.id);

        if (INDEX === -1) return INDEX;

        this.#container = [];
        this.#container.push(DATA);
        this.#container[INDEX] = obj;

        await FS.writeFile(

            this.#file, 
            JSON.stringify(
                
                this.#container, 
                null, 
                "\t"
                
            ));

        return this.#container[INDEX];

    };

    async deleteOne (criterion) {

        const DATA = await this.getAll();

        if (DATA.length === 0) return null;

        const INDEX = DATA.findIndex(items => items.id === criterion);

        if (INDEX === -1) return INDEX;

        this.#container = [];
        this.#container.push(DATA);

        const ERASED = this.#container.splice(INDEX, 1);

        await FS.writeFile(

            this.#file, 
            JSON.stringify(

                this.#container, 
                null, 
                "\t"

            ));

        return ERASED;

    };

};