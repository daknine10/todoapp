export default class Project {
    constructor(title) {
        this.title = title;
        this.list = [];
    }

    addTask(task) {
        this.list.push(task);
    }

    removeTask(task) {
        this.list.splice(this.list.indexOf(task), 1);
    }
}