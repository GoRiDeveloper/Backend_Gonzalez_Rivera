import { typeDefs } from "./db/schema.js";
import { resolvers } from "./db/resolvers.js";
import { CONECT_DB } from "./config/config.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { config } from "dotenv";
import pkgJSON from "jsonwebtoken";

config({ path: "variables.env" });

const { verify } = pkgJSON;

CONECT_DB();

const SERVER = new ApolloServer({

    typeDefs,
    resolvers

});

const { url } = await startStandaloneServer(SERVER, {

    listen: { port: 4000 },
    context: async ({req}) => {

        const TOKEN = req.headers["authorization"] || "";

        if (TOKEN) {

            try {

                const USUARIO = await verify(TOKEN.replace("Bearer ", ""), process.env.SECRET);

                return {

                    USUARIO

                };
                
            } catch (err) {

                console.log(err);

            };

        }

    }

});

console.log(`Servidor Listo En La URL : ${url}`);