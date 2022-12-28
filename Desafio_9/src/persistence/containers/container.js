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
        if (DATA.length) return null;

        return JSON.parse(DATA);

    };

    async getOne (criterion) {

        const DATA = await this.getAll();

        if (!DATA) return DATA;

        const ITEM = DATA.find(item => item.id === criterion);

        if (!ITEM) return ITEM;

        return ITEM;

    };

    async updateOne (obj) {

        const DATA = await this.getAll();

        if (!DATA) return DATA;

        const INDEX = DATA.findIndex(item => item.id === obj.id);

        if (!INDEX) return INDEX;

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

        if (!DATA) return DATA;

        const INDEX = DATA.findIndex(item => item.id === criterion);

        if (!INDEX) return INDEX;

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