import * as DateFNS from "date-fns";
import Project from "./project.js"
import Task from "./task.js"

export default class Manager {
    constructor() {
        this.taskList = []
        this.projectList = []
    }

    // PROJECT METHODS //

    createProject(title) {
        this.projectList.push(new Project(title));
    }

    removeProject(project) {
        this.projectList.splice(this.projectList.indexOf(project), 1);
    }

    removeProjectWithTasks(project) {
        for (let task of project.list) {
            this.removeTask(task);
        }
        this.sortByDate()
    }
    
    // TASK METHODS //

    createTask(title, description, notes, dueDate, priority) {
        this.addTask(new Task(title, description, notes, dueDate, priority));
    }

    addTask(task) {
        this.taskList.push(task);
        this.sortByDate();
    }

    removeTask(task) {
        for (let project of projectList) {
            if (project.list.includes(task)) {
                project.removeTask(task);
            }
        this.taskList.splice(this.taskList.indexOf(task), 1);
        this.sortByDate();
        };
    };

    assignTaskToProject(task, project) {
        project.addTask(task);
    };

    changeComplete(task) {
        task.switchComplete()
    };

    // GET METHODS //

    getDueToday() {
        let dueToday = []
        for (let task of this.taskList) {
            if (DateFNS.isBefore(task.dueDate, DateFNS.endOfDay(Date.now())) 
                && DateFNS.isAfter(task.dueDate, DateFNS.endOfYesterday())
                && task.complete === false) dueToday.push(task);
        }
        return dueToday;
    };

    getWithinWeek() {
        let withinWeek = []
        for (let task of this.taskList) {
            if (DateFNS.isBefore(task.dueDate, DateFNS.addDays(task.dueDate(), 7)) 
                && DateFNS.isAfter(task.dueDate, DateFNS.endOfDay(Date.now()))
                && task.complete === false) dueToday.push(task);
        }
        return withinWeek;
    };

    getOverdue() {
        let overdue = []
        for (let task of this.taskList) {
            if (DateFNS.isPast(task.dueDate) && task.complete === false) overdue.push(task);
        }
        return overdue;
    };

    getAll() {
        let all = []
        for (let task of this.taskList) {
            if (task.complete === false) all.push(task);
        }
        return all;
    }

    getCompleted() {
        let completed = []
        for (let task of this.taskList) {
            if (task.complete === true) completed.push(task);
        }
        return completed;
    }

    // HELP METHODS //
    sortByDate() {
        this.taskList.sort((a, b) => {a.dueDate > b.dueDate ? 1 : -1});
    };
}