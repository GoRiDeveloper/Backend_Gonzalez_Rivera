import colors from "colors";
import { createInterface } from "readline";

function mostrarMenu () {

    return new Promise(res => {        

        console.log(`${"1.".green} Crear tarea`);
        console.log(`${"2.".green} Crear tarea`);
        console.log(`${"3.".green} Crear tarea`);
        console.log(`${"4.".green} Crear tarea`);
        console.log(`${"5.".green} Crear tarea`);
        console.log(`${"6.".green} Crear tarea`);
        console.log(`${"0.".green} Crear tarea \n`);

        const readline = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question("Seleccione una opción: ", (opt) => {

            readline.close();
            res(opt);

        });

    });

};

function pause () {

    return new Promise(res => {

        const readline = createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${"ENTER".green} para continuar.\n`, (opt) => {

            readline.close();
            res(opt);

        });

    });

};

export {
    mostrarMenu,
    pause
};