import { randomUUID as generateID } from "crypto";
import { faker } from "@faker-js/faker";

class ContainerProds {

    /*#container 

    constructor () {

        this.#container = containerProducts;

    };*/

    generateProd () {

        const PROD = {

            id: generateID(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            img: faker.image.placeholder.imageUrl(),
            stock: faker.random.numeric(2)

        };

        return PROD;

    };

    generateProds (number) {

        const PRODS = [];

        for (let i = 1; i <= number; i++) {

            PRODS.push(this.generateProd());

        };

        return PRODS;

    };

    async getProds (number) {

        const PRODS = this.generateProds(number);

        return PRODS;

    };

};

const PRODS = new ContainerProds();

export { PRODS };