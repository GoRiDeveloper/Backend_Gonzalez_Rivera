import { graphqlHTTP } from "express-graphql";
import { PRODUCTS_SCHEMA } from "../schema/products_graphql.js";
import { PRODUCTS_RESOLVERS } from "../resolvers/products_graphql.js";

export default graphqlHTTP({

    graphiql: true,
    schema: PRODUCTS_SCHEMA,
    rootValue: PRODUCTS_RESOLVERS

});