import { mySqlConfig as knex } from "../db_config.js";

const EXIST = await knex.schema.hasTable("Products");

export default async function createTable() {

    if (!EXIST) {

        knex.schema.createTable("Products", table => {

            table.string("id"),
            table.string("name"),
            table.string("description"),
            table.float("price"),
            table.string("img"),
            table.integer("stock")

        })
        .then(() => {

            console.log("La tabla Productos fue creada.");

        })
        .catch((err) => {

            console.log(`¡Ocurrió un Error inesperado. Error : ${err}!`);

        });
        
    } else {

        console.log("La tabla Productos ya existe.");
        
    };

};