const fs = require("fs").promises;

class Container {

    constructor (file, messages) {

        this.file = file;
        this.messages = messages;

    };

};

class Methods extends Container {

    constructor (file, messages) {

        super(file, messages);
        this.prods = [];
        this.msg = [];

    };

    async getAll () {
        
        const data = await fs.readFile(this.file, "utf-8");

        if (data) {

            const arr = JSON.parse(data);
            return arr;

        } else {

            return null;

        };

    };

    async getProd (id) {

        const data = await this.getAll();

        if (data === null) {

            return null;

        } else {

            const prods = data.find(item => item.id === id);
            return prods;

        };

    };

    async postProd (prod) {

        this.prods.push(prod);
        await fs.writeFile(this.file, JSON.stringify(this.prods, null, "\t"));

        return await this.getAll();

    };

    async putProd (modify, id) {

        const data = await this.getAll();

        if (!data) {
            
            return null;

        } else {
          
            const prodI = data.findIndex(i => i.id === id);

            if (prodI === -1) {
                
                return null;

            } else {
              
                this.prods[prodI] = modify;

                await fs.writeFile(this.file, []);
                await fs.writeFile(this.file, JSON.stringify(this.prods, null, "\t"));

                return this.prods[prodI];

            };
            
        };

    };

    async getTxt () {

        const txt = await fs.readFile(this.messages, "utf-8");

        if (txt) {
            
            const arr = JSON.parse(txt);
            return arr;

        } else {
          
            return null;
        };

    };

    async postTxt (txt) {

        this.msg.push(txt);
        await fs.writeFile(this.messages, JSON.stringify(this.msg, null, "\t"));

        return await this.getTxt();

    };

};

module.exports = { Methods };