import fs from "fs";

const FS = fs.promises;

export default class Products {

    #file
    #prods

    constructor (file) {

        this.#file = file;
        this.#prods = [];

    };

    async getAll () {

        const DATA = await FS.readFile(this.#file, "utf-8");

        if (DATA) {

            const ARR = JSON.parse(DATA);

            if (ARR.length > 0) {

                return ARR; 

            } else {

                return null;

            };
            
        } else {

            return null;
            
        };

    };

    async getProd (id) {

        const DATA = await this.getAll();

        if (DATA) {

            const PROD = DATA.find(prod => prod.id === id);
            return PROD;
            
        } else {

            return DATA;
            
        };

    };

    async postProd (prod) {

        this.#prods.push(prod);
        await FS.writeFile(this.#file, JSON.stringify(this.#prods, null, "\t"));

        const PRODS = await this.getAll();

        if (PRODS) {
    
            return PRODS;
            
        } else {

            return PRODS;
            
        };

    };

    async putProd (id, prod) {

        let DATA = await this.getAll();

        if (DATA) {

            const PRODI = DATA.findIndex(i => i.id === id);

            if (PRODI === -1) {

                return null;
                
            } else {

                this.#prods = [];
                this.#prods.push(...DATA);
                this.#prods[PRODI] = prod;
                await FS.writeFile(this.#file, JSON.stringify(this.#prods, null, "\t"));

                DATA = await this.getAll();

                if (DATA) {

                    return this.#prods[PRODI];
                    
                } else {

                    return null;
                    
                };
                
            };
            
        } else {

            return DATA;
            
        };

    };

    async deleteProd (id) {

        const DATA = await this.getAll();

        if (DATA) {

            const PRODI = DATA.findIndex(i => i.id === id);

            if (PRODI === -1) {

                return null;
                
            } else {

                this.#prods = [];
                this.#prods.push(...DATA);
                const ERASED = this.#prods.splice(PRODI, 1);

                await FS.writeFile(this.#file, JSON.stringify(this.#prods, null, "\t"));

                if (ERASED.length > 0) {

                    return ERASED;
                    
                } else {

                    return null;
                    
                };
                
            };
            
        } else {

            return DATA;
            
        };

    };

};