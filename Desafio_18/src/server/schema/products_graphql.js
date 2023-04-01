import { buildSchema } from "graphql";

export const PRODUCTS_SCHEMA = buildSchema(`

    type Product {

        id: ID
        name: String
        description: String
        price: Float
        img: String
        stock: Int

    }

    input ProductInput {

        name: String!
        description: String!
        price: Float!
        img: String!
        stock: Int!

    }

    input ProdDataInput {

        name: String
        description: String
        price: Float
        img: String
        stock: Int

    }

    type Query {

        getProduct(id: ID!): Product
        getProducts: [Product]

    }

    type Mutation {

        addProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductInput!): Product
        updateProductData(id: ID!, input: ProdDataInput!): Product
        deleteProduct(id: ID!): Product

    }

`);