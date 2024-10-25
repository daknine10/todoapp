import * as DateFNS from "date-fns";
import Project from "./project.js"
import Task from "./task.js"

export default class Manager {
    constructor() {
        this.basicProjects = [new Project("all"), new Project("today"), new Project("withinWeek"), new Project("overdue"), new Project("completed")]
    }

    // PROJECT METHODS //

    createProject(title) {
        this.basicProjects.push(new Project(title));
    }

    removeProject(project) {
        this.basicProjects.splice(this.projectList.indexOf(project), 1);
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
        this.basicProjects[0].list.push(task);
        this.sortByDate();
    }

    removeTask(task) {
        for (let project of this.basicProjects) {
            if (project.list.includes(task)) {
                project.removeTask(task);
            }
        }
    }

    assignTaskToProject(task, project) {
        project.addTask(task);
    };

    changeComplete(task) {
        task.switchComplete()
    };

    // GET METHODS //

    getDueToday() {
        let dueToday = []
        for (let task of this.basicProjects[0].list) {
            if (DateFNS.isBefore(task.dueDate, DateFNS.endOfDay(Date.now())) 
                && DateFNS.isAfter(task.dueDate, DateFNS.endOfYesterday())
                && task.complete === false) dueToday.push(task);
        }
        this.basicProjects[1].list = dueToday;
    };

    getWithinWeek() {
        let withinWeek = []
        for (let task of this.basicProjects[0].list) {
            if (DateFNS.isBefore(task.dueDate, DateFNS.addDays(task.dueDate, 7)) 
                && DateFNS.isAfter(task.dueDate, DateFNS.endOfDay(Date.now()))
                && task.complete === false) withinWeek.push(task);
        }
        this.basicProjects[2].list = withinWeek;
    };

    getOverdue() {
        let overdue = []
        for (let task of this.basicProjects[0].list) {
            if (task.complete === false && DateFNS.isBefore(task.dueDate, DateFNS.endOfYesterday(Date.now()))) overdue.push(task);
        }
        this.basicProjects[3].list = overdue;
    };

    getAll() {
        let all = []
        for (let task of this.basicProjects[0].list) {
            if (task.complete === false) all.push(task);
            else this.basicProjects[4].list.push(task);
        }
        this.basicProjects[0].list = all;
    }

    getCompleted() {
        let completed = []
        for (let task of this.basicProjects[0].list) {
            if (task.complete === true) completed.push(task);
        }
        this.basicProjects[4].list = completed;
    }

    getProject(project) {
        return project.list
    }

    // HELP METHODS //
    sortByDate() {
        this.basicProjects[0].list.sort((a, b) => a.dueDate - b.dueDate);
    };

    refreshProjects () {
        this.getAll();
        this.getDueToday();
        this.getOverdue();
        this.getWithinWeek();
        this.getCompleted();
    }
}