import { Task } from "./Task.js";
import {format} from 'date-fns';

const DOM = (() =>{

    const openForm = () => {
        hideNewTaskButton();
        addForm();
    };

    const closeForm = () => {
        const form = document.querySelector("form");
        form.remove();
    };

    const hideNewTaskButton = () => {
      document.getElementById("new-task").classList.add("hide");
    };

    const showNewTaskButton = () => {
        document.getElementById("new-task").classList.remove("hide"); 
        document.getElementById("new-task").classList.add("show");
    };

    const hideNewProjectButton = () => {
        document.getElementById("new-project").classList.add("hide");
      };
  
      const showNewProjectButton = () => {
          document.getElementById("new-project").classList.remove("hide"); 
          document.getElementById("new-project").classList.add("show");
      };
    const addForm = () => {
        const projectName = document.getElementById("task-before").innerText;
        const form = document.createElement("form");
        form.innerHTML = `
          <form>
            <fieldset>
              <legend>Task details</legend>
              <div class="title">
                  <label for="title">Title</label>
              <input type="text" id="title" required>
              </div>
              <div class="description">
                  <label for="description">Description</label>
                  <textarea id="description" name="description" rows="5"></textarea>
              </div>
              <div class="due-date">
                  <label for="due-date">Due date</label>
                  <input type="date" id="due-date">
              </div>
              <div class="priority">
                  <label>Priority</label>
                  <select id="priority" name="priority">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low" selected>Low</option>
                  </select>
              </div>
              <div class="submit-buttons">
                  <input type="submit">   
                  <input type="reset" value="Cancel">
              </div>
            </fieldset>
          </form>`;
        document.querySelector("main").appendChild(form);
        addEventListener("submit", () => {
            showNewTaskButton();
            Task.add(projectName);
            closeForm();
        }, {once : true});
        addEventListener("reset", () => {
            closeForm();
            showNewTaskButton();
        }, {once : true})
    };

    const showAllTasks = (projectName) => {

        //delete previous task, for refreshing and then loading again
        document.querySelectorAll(".task-div").forEach(el => el.remove())

        let taskKeys = Task.getKeysByProject(projectName); //getting local storage task keys
        if(taskKeys == null) return;
        taskKeys["id"].forEach( key => {
            const task = JSON.parse(window.localStorage.getItem(key));
            
            //creating task HTML
            const div = document.createElement("div");
            div.classList.add(`${task.priority}-priority`);
            div.classList.add(`task`);
            div.classList.add(`task-div`);
            div.innerHTML = `
            <div class="${task.status}-box checkbox" id="${task.id}"></div>
            <p class="task-title" >${task.title}</p>
            <p class="task-date">${task.dueDate}</p>
            <div class="edit-task"></div>
            <div class="delete-task" id="${task.id}"></div>
            `;
            const inbox = document.getElementById("task-before")
            inbox.after(div);            
        })
        addTasksEventListeners(projectName);
    };

    const addTasksEventListeners = (projectName) => {
        const taskCheckbox = document.querySelectorAll(".checkbox")
        taskCheckbox.forEach( el  => el.addEventListener("click", () => {
            Task.toggleStatus(el.id);
            showAllTasks(projectName)}))

        const taskDelete = document.querySelectorAll(".delete-task")
        taskDelete.forEach( el => el.addEventListener("click", () => {
            Task.delete(el.id);
            showAllTasks(projectName);
        }))
        
    }


    const addProject = () => {
        hideNewProjectButton();

        const form = document.createElement("form");
        form.classList.add("project-form")
        form.innerHTML = 
        `
            <input type="text" id="projectName" required>
            <div id="project-buttons">
                <input type="submit">   
                <input type="reset" value="Cancel">
            </div> 
            
         `
        const newProjectButton = document.getElementById("new-project");
        newProjectButton.before(form);

        addEventListener("submit", () => {
            Task.addProject();
            closeForm();
            loadProjects();
            showNewProjectButton();
            
        });

        document.addEventListener("reset", () => {
            closeForm();
            showNewProjectButton();
        })
    }

    const createProjectPage = (projectName) =>{
        document.getElementById("task-before").innerText = projectName; //change title
        document.querySelectorAll(".task-div").forEach(el => el.remove()); //delete previous Task
        showAllTasks(projectName);
       
    }

    const loadProjects = () => {
        document.querySelectorAll(".project-id").forEach(el => el.remove())
        const el = document.getElementById("project-title");
        const projectNames = Task.getProjectNames();
        if(projectNames == null) return;
        projectNames.reverse().forEach( project => {
            const li = document.createElement("li");
            li.classList.add("project-id")
            li.innerText = project;
            li.addEventListener("click", () => createProjectPage(project))
            el.after(li)
        })
    }

    return {openForm, closeForm, showAllTasks, addProject, loadProjects, createProjectPage};
}
)();

export {DOM};