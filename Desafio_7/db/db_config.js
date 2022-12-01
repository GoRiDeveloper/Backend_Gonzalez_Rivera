import createKnexClient from "knex";

export const mySqlConfig = createKnexClient({

    client: 'mysql2',
    connection: 'mysql://root:mysqlpassword@localhost:3306/Shop_GGR'

});