import CreateTask from "../tarea/index.js";

export default class Tasks {

    constructor () {
        this._list = {};
    };

    get listadoArr () {

        const listadoArr = [];
        Object.keys(this._list)
            .forEach(key => listadoArr.push(this._list[key]));
        return listadoArr;

    };

    deletedTask (id = "") {
        if (this._list[id]) delete this._list[id];
    };

    createTask (desc = "") {
        const task = CreateTask(desc);
        this._list[task.id] = task;
    };

    loadTaksFromArr (tasks = []) {
        tasks.forEach(task => this._list[task.id] = task);
    };

    listCompleted () {

        console.log();

        this.listadoArr.forEach((task, i) => {

            const 
            
            INDEX          = `${i + 1}.`.green,
            {desc, filled} = task,
            STATE          = filled
                                ? "Completada".green 
                                : "Pendiente".red;
             
            console.log(`${INDEX} ${desc} :: ${STATE}`);

        });

    };

    listOfPendingAndCompleted (completed = true) {

        let counter = 0;
        this.listadoArr.forEach(({desc, filled}) => {

            const STATE = filled
                            ? filled.green
                            : "Pendiente".red;

            if (completed) {

                if (filled) {
                    counter += 1;
                    console.log(`${(counter.toString() + ".").green} ${desc} ${STATE}`);
                };

            } else {

                if (!filled) {
                    counter += 1;
                    console.log(`${(counter.toString() + ".").green} ${desc} ${STATE}`);
                };

            }; 

        });

    };

    toggleCompleted (ids = []) {

        ids.forEach(id => {
            const task = this._list[id];
            if (!task.filled) task.filled = new Date().toISOString();
        });

        this.listadoArr.forEach(task => {
            if (!ids.includes(task.id)) 
                this._list[task.id].filled = null;;
        });

    };

};