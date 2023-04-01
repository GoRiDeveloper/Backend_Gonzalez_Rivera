import colors from "colors";
import tasks from "./models/tareas/index.js";
import {saveData, readData} from "./helpers/save.js";
import {

    menu, 
    pause, 
    readInput, 
    listTaksToDelete, 
    confirmation, 
    showCheckList

} from "./helpers/inquirer.js";

async function main () {

    console.clear();

    let opt;
    const tasksData = readData();

    if (tasksData) tasks.loadTaksFromArr(tasksData);

    do {

        opt = await menu();

        switch (opt) {

            case "1":
                const desc = await readInput("Descripción :"); 
                tasks.createTask(desc);
            break;

            case "2":
                tasks.listCompleted();
            break;

            case "3":
                console.log();
                tasks.listOfPendingAndCompleted();
            break;

            case "4":
                console.log();
                tasks.listOfPendingAndCompleted(false);
            break;

            case "5":
                const ids = await showCheckList(tasks.listadoArr);
                tasks.toggleCompleted(ids);
            break;

            case "6":

                const id = await listTaksToDelete(tasks.listadoArr);

                if (id !== "0") {

                    const confirm = await confirmation("¿Estás Seguro?");

                    if (confirm) { 
                        tasks.deletedTask(id);
                        console.log();
                        console.log("Tarea Eliminada");
                    };

                };

            break;

        };

        saveData(tasks.listadoArr);
        await pause();

    } while (opt !== "0");

};

main();