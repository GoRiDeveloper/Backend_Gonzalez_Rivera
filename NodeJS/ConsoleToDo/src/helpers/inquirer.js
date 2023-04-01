import inquirer from "inquirer";
import colors from "colors";

const 

questionsMenu = [
    {

        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [

            {
                value: "1",
                name: `${"1.".green} Crear tarea`
            },
            {
                value: "2",
                name: `${"2.".green} Listar tareas`
            },
            {
                value: "3",
                name: `${"3.".green} Listar tareas completadas`
            },
            {
                value: "4",
                name: `${"4.".green} Listar tareas pendientes`
            },
            {
                value: "5",
                name: `${"5.".green} Completar tarea(s)`
            },
            {
                value: "6",
                name: `${"6.".green} Borrar tarea`
            },
            {
                value: "0",
                name: `${"0.".green} Salir`
            }
            
        ]

    }
],
questionsPause = [
    {

        type: "input",
        name: "enter",
        message: `Presione ${"ENTER".green} para continuar.`
        
    }
];

async function menu () {

    console.clear();
    console.log("==========================".green);
    console.log("  Seleccione una opción.".white);
    console.log("==========================\n".green);

    const { opcion } = await inquirer.prompt(questionsMenu);

    return opcion;

};

async function pause () {

    console.log("\n");
    await inquirer.prompt(questionsPause);
    
};

async function readInput (message) {

    const 
    
    question = [
        {

            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) return "Por favor ingresa un mensaje";
                return true;
            }

        }
    ],
    { desc } = await inquirer.prompt(question);

    return desc;

};

async function listTaksToDelete (tasks = []) {

    const choices = tasks.map((task, i) => {
        const INDEX = `${i+1}.`.green;
        return {
            value: task.id,
            name: `${INDEX} ${task.desc}`
        };
    });

    choices.unshift({
        value: "0",
        name: `${"0.".green} Cancelar`
    });

    const

    questions = [
        {

            type: "list",
            name: "id",
            message: "Borrar",
            choices

        }
    ],
    { id } = await inquirer.prompt(questions);

    return id;

};

async function confirmation (message) {

    const 
    
    question = [
        {
            type: "confirm",
            name: "ok",
            message
        }
    ],
    { ok } = await inquirer.prompt(question);

    return ok;

};

async function showCheckList (tasks = []) {

    const 
    
    choices = tasks.map((task, i) => {

        const 
        
        INDEX              = `${i+1}. `.green,
        {id, desc, filled} = task;

        return {

            value: id,
            name: `${INDEX} ${desc}`,
            checked: filled 
                        ? true 
                        : false

        };

    }),
    question = [
        {

            type: "checkbox",
            name: "ids",
            message: "Selecciones",
            choices

        }
    ],
    { ids } = await inquirer.prompt(question);

    return ids;

};

export {

    menu, 
    pause,
    readInput,
    listTaksToDelete,
    confirmation,
    showCheckList

};