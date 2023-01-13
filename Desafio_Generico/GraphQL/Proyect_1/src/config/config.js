import { connect, set } from "mongoose";
import { config } from "dotenv";

config({ path: "variables.env" });

const CONECT_DB = async () => {

    try {

        set("strictQuery", false);
        connect(process.env.DB_MONGO);

        console.log("DB Conectada.");
        
    } catch (err) {

        console.log(`¡¡ERROR : ${err}!!`);
        process.exit(1);
        
    };

};

export { CONECT_DB };