import "./styles.css"
import "date-fns"
import Manager from "./modules/manager.js"
import Task from "./modules/task.js"
import { renderTaskList, addProjectListener, renderProjects, addTaskListener } from "./modules/render.js"

const manager = new Manager()

manager.createTask("Task1", "This is a Task", "2024-10-23", "High")
manager.createTask("Task2", "This is a Task", "2024-10-24", "Low")
manager.createTask("Task3", "This is a Task", "2024-10-28", "High")
manager.createTask("Task3", "This is a Task", "2024-10-25", "High")

manager.createProject("Project1")
manager.createProject("Project2")
manager.basicProjects[5].addTask(new Task("Task10", "This is asd", "2024-10-23", "High"))
manager.basicProjects[5].addTask(new Task("Task92", "This is a xcvbsk", "2024-10-23", "High"))
manager.basicProjects[5].addTask(new Task("Task10", "This is a Task", "2024-10-23", "High"))
manager.basicProjects[6].addTask(new Task("Task92", "This is a Taae6435k", "2024-10-23", "High"))
manager.basicProjects[6].addTask(new Task("Task10", "This is a Tgreqask", "2024-10-23", "High"))


if (window.localStorage.length !== 0) {
    manager.loadList();
}

const all = document.querySelector("#all");
all.addEventListener("click", () => {
    manager.refreshProjects()
    renderTaskList(manager, manager.basicProjects[0]);
})

const today = document.querySelector("#today");
today.addEventListener("click", () => {
    manager.refreshProjects()
    renderTaskList(manager, manager.basicProjects[1])
})

const week = document.querySelector("#week");
week.addEventListener("click", () => {
    manager.refreshProjects()
    renderTaskList(manager, manager.basicProjects[2])
})

const overdue = document.querySelector("#overdue");
overdue.addEventListener("click", () => {
    manager.refreshProjects()
    renderTaskList(manager, manager.basicProjects[3])
})

addProjectListener(manager);
renderProjects(manager);
addTaskListener(manager);
renderTaskList(manager, manager.basicProjects[0])