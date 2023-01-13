import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";
import fetch from "node-fetch";

const HTTP_LINK = createHttpLink({

    uri: "http://localhost:4000/",
    fetch

});

const AUTH_LINK = setContext((_, { headers }) => {

    const TOKEN = localStorage.getItem("token");

    return {

        headers: {

            ...headers,
            authorization: 
                TOKEN 
                    ? `Bearer ${TOKEN}`
                    : ""

        }

    };

});

const CLIENT = new ApolloClient({

    connectToDevTools: true,
    link: AUTH_LINK.concat(HTTP_LINK),
    cache: new InMemoryCache()

});

export default CLIENT;