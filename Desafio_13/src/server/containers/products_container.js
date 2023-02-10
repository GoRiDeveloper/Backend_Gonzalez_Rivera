import { faker } from "@faker-js/faker";
import { randomUUID as generateID } from "crypto";

class ProductsContainer {

    generateProduct () {

        const PRODUCT = {

            id: generateID(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(100, 100000, 0, "$"),
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

        if (!PRODUCTS) return null;

        return PRODUCTS;

    };

};

export const PRODUCTS = new ProductsContainer();