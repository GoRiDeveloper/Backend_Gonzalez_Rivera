import { randomUUID as generateID } from "crypto";
import { faker } from "@faker-js/faker";

class ProductsContainer {

    generateProduct () {

        const PRODUCT = {

            id: generateID(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            img: faker.image.placeholder.imageUrl(),
            stock: faker.random.numeric(2)

        };

        return PRODUCT;

    };

    generateProducts (number) {

        const PRODUCTS = [];

        for (let i = 1; i <= number; i++) {

            PRODUCTS.push(this.generateProduct());

        };

        return PRODUCTS;

    };

    async getProducts (number) {

        const PRODUCTS = await this.generateProducts(number);

        return PRODUCTS;

    };

};

export const PRODUCTS = new ProductsContainer();