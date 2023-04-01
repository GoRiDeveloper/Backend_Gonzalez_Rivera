import Task from "./tarea.js";
/**
 * @param {String} desc 
 * @returns {Task}
 */
export default function CreateTask (desc) {
    return new Task(desc);
};