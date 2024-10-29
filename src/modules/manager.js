import * as DateFNS from "date-fns";
import Project from "./project.js"
import Task from "./task.js"

export default class Manager {
    constructor() {
        this.basicProjects = [new Project("All tasks"), new Project("Today"), new Project("Next 7 days"), new Project("Overdue")]
    }

    // PROJECT METHODS //

    createProject(title) {
        this.basicProjects.push(new Project(title));
    }

    removeProject(project) {
        this.basicProjects.splice(this.basicProjects.indexOf(project), 1);
    }

    removeProjectWithTasks(project) {
        for (let task of project.list) {
            this.removeTask(task);
        }
        this.basicProjects.splice(this.basicProjects.indexOf(project), 1);
        this.refreshProjects();
    }
    
    // TASK METHODS //

    createTask(title, description, notes, dueDate, priority) {
        const newTask = new Task(title, description, notes, dueDate, priority)
        this.addTask(newTask);
        return newTask;
    }

    addTask(task) {
        this.basicProjects[0].list.push(task);
        this.refreshProjects();
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
        this.sortByDate(dueToday)
        this.basicProjects[1].list = dueToday;
    };

    getWithinWeek() {
        let withinWeek = []
        for (let task of this.basicProjects[0].list) {
            if (DateFNS.isBefore(task.dueDate, DateFNS.addDays(task.dueDate, 7)) 
                && DateFNS.isAfter(task.dueDate, DateFNS.endOfDay(Date.now()))
                && task.complete === false) withinWeek.push(task);
        }
        this.sortByDate(withinWeek)
        this.basicProjects[2].list = withinWeek;
    };

    getOverdue() {
        let overdue = []
        for (let task of this.basicProjects[0].list) {
            if (task.complete === false && DateFNS.isBefore(task.dueDate, DateFNS.endOfYesterday(Date.now()))) overdue.push(task);
        }
        this.sortByDate(overdue)
        this.basicProjects[3].list = overdue;
    };

    getAll() {
        let all = []
        for (let task of this.basicProjects[0].list) {
            all.push(task);
        }
        this.sortByDate(all)
        this.basicProjects[0].list = all;
    }

   
    getProjects() {
        for (let project of this.basicProjects.slice(5)) {
            this.sortByDate(project.list)
    }
    }
    

    // HELP METHODS //
    sortByDate(list) {
        list.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        list.sort((a, b) => b.complete - a.complete)
    };

    storeList(){
        localStorage.clear();
        for (let project of this.basicProjects) {
            localStorage.setItem(this.basicProjects.indexOf(project), JSON.stringify(project))
        }
    }

    loadList(){
        for (let i = 0; i < localStorage.length; i++) {
            const value = JSON.parse(localStorage.getItem(i))
            if (i >= this.basicProjects.length) {
                this.basicProjects.push(new Project(value.title))
            }
            this.basicProjects[i].list = []
            if (value.list.length !== 0) {
                for (let task of value.list) {
                    console.log(task)
                    this.basicProjects[i].list.push(new Task(task.title, task.description, task.dueDate, task.priority, task.complete))
                }
            }
        }
    }

    refreshProjects () {
        this.getAll();
        this.getDueToday();
        this.getOverdue();
        this.getWithinWeek();
        this.getProjects();
    }
}