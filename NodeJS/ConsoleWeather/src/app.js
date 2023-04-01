import colors from "colors";
import Search from "./models/busquedas/index.js";
import {menu, pause, readInput} from "./helpers/inquirer.js";

async function main () {

    console.clear();

    let opt;

    do {

        opt = await menu();

        switch (opt) {

            case 1:

                const place = await readInput("Ciudad: ");
                await Search.city(place);

                console.log("\n Información de la ciudad\n".green);
                console.log("Ciudad:",);
                console.log("Lat",);
                console.log("Lng",);
                console.log("Temperatura:",);
                console.log("Mínima:", );
                console.log("Máxima:", );
                
            break;

            case 2:

            break;

        };

        if (opt !== 0) await pause();
        
    } while (opt !== 0);

};

main();