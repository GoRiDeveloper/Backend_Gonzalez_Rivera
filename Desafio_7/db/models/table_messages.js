import { mySqlConfig as knex } from "../db_config.js";

const EXIST = await knex.schema.hasTable("Messages");

export default async function createTable () {

    if (!EXIST) {
        
        knex.schema.createTable("Messages", table => {

            table.string("id"),
            table.string("date"),
            table.string("author"),
            table.string("message")

        })
        .then(() => {

            console.log("La Tabla Mensajes fue creada.");

        })
        .catch((err) => {

            console.log(`¡Ocurrió un Error Inesperado. Error : ${err}!`);

        });

    } else {

        console.log("La tabla Mensajes ya existe.");
        
    };

};