import Task from "./task.js"

export default class Project {
    constructor(title) {
        this.title = title;
        this.list = [];
    }

    addTask(task) {
        this.list.push(task);
        this.sortByDate();
    }

    removeTask(task) {
        this.list.splice(this.list.indexOf(task), 1);
        this.sortByDate();
    }

    sortByDate() {
        this.list.sort((a, b) => {a.dueDate > b.dueDate ? 1 : -1});
    };
}