import { format } from "date-fns"

function renderTask(task, index) {  
    const taskContainer = document.querySelector(".task-container")

    const taskBox = document.createElement("div");
    taskBox.className = "task-box";
    taskBox.dataset.index = index;

    const cardTop = document.createElement("div");
    cardTop.className = "card-top"

    const dueDate = document.createElement("p");
    dueDate.className = "due-date";
    dueDate.textContent = format(task.dueDate, 'yyyy/MM/dd');

    const taskTitle = document.createElement("h2");
    taskTitle.textContent = task.title;
    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;

    const cardBottom = document.createElement("div")
    cardBottom.className = "card-bottom";
    const priority = document.createElement("p");
    priority.className = "priority";
    priority.textContent = task.priority;

    const taskButtons = document.createElement("div");
    taskButtons.className = "task-buttons";
    const editButton = document.createElement("button");
    editButton.className = "edit";
    editButton.textContent = "Edit";

    const removeButton = document.createElement("button");
    removeButton.className = "remove";
    removeButton.textContent = "Remove";

    taskContainer.appendChild(taskBox);
    taskBox.appendChild(cardTop);
    taskBox.appendChild(cardBottom);
    cardTop.appendChild(dueDate);
    cardTop.appendChild(taskTitle);
    cardTop.appendChild(taskDescription);
    cardBottom.appendChild(priority);
    cardBottom.appendChild(taskButtons);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(removeButton);
}

function renderTaskList(manager, project) {
    const taskContainer = document.querySelector(".task-container")
    taskContainer.textContent = ""
    taskContainer.dataset.project = manager.basicProjects.indexOf(project);

    for (let [index, task] of project.list.entries()) {
        renderTask(task, index)
    }

    const removeButtons = [...document.querySelectorAll(".remove")]
    for (let removeButton of removeButtons) {
        removeButton.addEventListener("click", (e) => {
            const task = project.list[e.target.closest(".task-box").dataset.index]
            manager.removeTask(task);
            renderTaskList(manager, project);
        })
    }
}
const projects = document.querySelector(".projects");
const addProject = document.querySelector(".add-project");
const addTask = document.querySelector(".add-task")
const dialog = document.querySelector("dialog");

function addProjectListener(manager) {
    addProject.addEventListener("click", () => {
        dialog.textContent = ""
        const label = document.createElement("label")

        label.setAttribute("for", "name")
        label.textContent = "Name of the project:"

        const textBox = document.createElement("input");
        textBox.setAttribute("id", "name")

        const button = document.createElement("button");
        button.textContent = "Submit";

        button.addEventListener("click", () => {
            manager.createProject(textBox.value)
            renderProjects(manager)
            dialog.close()
        })

        dialog.appendChild(label);
        dialog.appendChild(textBox);
        dialog.appendChild(button);
        dialog.show();
    })
}

function renderProjects(manager) {
    projects.textContent = ""
    for (let [index, project] of manager.basicProjects.slice(5).entries()) {
        const projectButton = document.createElement("button")
        projectButton.className = "project-button"
        projectButton.textContent = project.title;
        projectButton.dataset.index = index;

        projectButton.addEventListener("click", () => {
            renderTaskList(manager, project)
        })

        projects.appendChild(projectButton);
    }
}

function addTaskListener(manager) {
    addTask.addEventListener("click", () => {
        dialog.textContent = "";
        const titleLabel = document.createElement("label");

        titleLabel.setAttribute("for", "title");
        titleLabel.textContent = "Title of task:";
        dialog.appendChild(titleLabel)

        const titleTextBox = document.createElement("input");
        titleTextBox.setAttribute("id", "title");
        dialog.appendChild(titleTextBox)

        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description:"
        descriptionLabel.setAttribute("for", "description");
        dialog.appendChild(descriptionLabel)

        const descriptionText = document.createElement("textarea");
        descriptionText.id = "description";
        dialog.appendChild(descriptionText)

        const dueDateLabel = document.createElement("label")
        dueDateLabel.textContent = "Due Date:"
        dueDateLabel.setAttribute("for", "date")
        dialog.appendChild(dueDateLabel)

        const selectDueDate = document.createElement("input")
        selectDueDate.setAttribute("type", "date");
        selectDueDate.id = "date";
        dialog.appendChild(selectDueDate)

        const priorityLabel = document.createElement("label")
        priorityLabel.setAttribute("for", "priority");
        priorityLabel.textContent = "Priority";
        dialog.appendChild(priorityLabel)

        const prioritySelect = document.createElement("select");
        prioritySelect.id = "priority"
        dialog.appendChild(prioritySelect)

        const high = document.createElement("option")
        high.textContent = "High"
        high.value = "High"
        prioritySelect.appendChild(high)

        const medium = document.createElement("option")
        medium.textContent = "Medium"
        medium.value = "Medium"
        prioritySelect.appendChild(medium)

        const low = document.createElement("option")
        low.textContent = "Low"
        low.value = "Low"
        prioritySelect.appendChild(low)

        const submit = document.createElement("button");
        submit.textContent = "Submit";
        submit.addEventListener("click", (e) => {
            const projectIndex = document.querySelector(".task-container").dataset.project
            manager.createTask(titleTextBox.value, descriptionText.value, selectDueDate.value, prioritySelect.value)
            manager.refreshProjects()
            renderTaskList(manager, manager.basicProjects[projectIndex])
            dialog.close();
        })
        dialog.appendChild(submit);

        dialog.show();
    })
}

export {renderTaskList, addProjectListener, renderProjects, addTaskListener}