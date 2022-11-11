class Container {

    constructor() {

        this.prods = [];

    };

};

class Methods extends Container {

    async getProd(id) {

        return this.prods.find(item => item.id === id);

    };

    async postProd(prod) {

        return this.prods.push(prod);

    };

    async putProd(modify, id) {

        if (!this.prods) {

            return null;

        } else {

            const prodI = this.prods.findIndex(i => i.id === id);

            if (prodI === -1) {

                return null;

            } else {

                this.prods[prodI] = modify;
                return this.prods[prodI];

            };

        };

    };

    async deleteProd(id) {

        const prodI = this.prods.findIndex(i => i.id === id);

        if (prodI === -1) {

            return null;

        } else {

            return this.prods.splice(prodI, 1);

        };

    };

};

module.exports = { Methods };