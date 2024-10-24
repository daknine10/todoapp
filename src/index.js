import "./styles.css"
import Manager from "./modules/manager.js"
import Project from "./modules/project.js"
import Task from "./modules/task.js"

const manager = new Manager()

manager.createTask("Task1", "This is a Task", "2024-10-23", "High")
console.log(manager.getOverdue())