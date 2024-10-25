const projects = document.querySelector(".projects");
const addProject = document.querySelector(".add-project");

function addProjectListener(manager) {
    addProject.addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
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
    for (let [index, project] of manager.projectList.entries()) {
        const projectButton = document.createElement("button")
        projectButton.className = "project-button"
        projectButton.textContent = project.title;
        projectButton.dataset.index = index;

        projectButton.addEventListener("click", () => {
            renderTaskList(project.list, manager)
        })

        projects.appendChild(projectButton);
    }
}

export {addProjectListener, renderProjects}