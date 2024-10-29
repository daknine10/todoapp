import "./styles.css"
import "date-fns"
import Manager from "./modules/manager.js"
import Task from "./modules/task.js"
import { renderTaskList, addProjectListener, renderProjects, addTaskListener } from "./modules/render.js"

const manager = new Manager()

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