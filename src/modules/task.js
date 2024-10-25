export default class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.complete = false;
    }

    switchComplete() {
        this.complete = !this.complete ? true : false;
    }
}

