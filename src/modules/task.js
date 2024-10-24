export default class Task {
    constructor(title, description, notes, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.dueDate = Date(dueDate);
        this.priority = priority;
        this.complete = false;
    }

    switchComplete() {
        this.complete = !this.complete ? true : false;
    }
}

