import { DOM } from "./DOM.js";

class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = title.hashCode();
    }  

    static add(){
        event.preventDefault(); //Disable refresh after submit
       
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value || null;
        const dueDate = document.getElementById("due-date").value || null;
        const priority = document.getElementById("priority").value;

        //add validation logic.. pendent to do this
        
        const newTask = new Task(title, description, dueDate, priority);
        this.storeKey(newTask.id);
        window.localStorage.setItem(newTask.id, JSON.stringify(newTask));

        DOM.closeForm();
    }

    static getKeysByProject(project){
        if(project == "all") return JSON.parse(window.localStorage.getItem("taskKeys"));
    }

    static storeKey(id){
        if(window.localStorage.getItem("taskKeys") == null){
            let taskIdentification = {
                id: [id],
                projectName : ["Inbox"]
            };
            window.localStorage.setItem("taskKeys", JSON.stringify(taskIdentification));
            return;
        }
       
        let taskIdentification = JSON.parse(window.localStorage.getItem("taskKeys"));
        console.log(taskIdentification)
        taskIdentification["id"].push(id);
        taskIdentification["projectName"].push("Inbox");
        window.localStorage.setItem("taskKeys", JSON.stringify(taskIdentification));
    
    }

    static addProject(){
        event.preventDefault(); //Disable refresh after submit
        let projectName = document.getElementById("projectName").value;

        if(window.localStorage.getItem("projectNames") == null){
            let projectNames = {
                projectName: [projectName]
            }
            window.localStorage.setItem("projectNames", JSON.stringify(projectNames));
            return;
        }
        let projectNames = JSON.parse(window.localStorage.getItem("projectNames"));
        console.log(projectNames)
        projectNames["projectName"].push(projectName);
        window.localStorage.setItem("projectNames", JSON.stringify(projectNames));
    }

    static getProjectNames(){
        if(JSON.parse(window.localStorage.getItem("projectNames")) == null) return null;
        let projectNames = JSON.parse(window.localStorage.getItem("projectNames"));
        projectNames = projectNames["projectName"].map(name => name)
        return projectNames;
    }
}

export {Task};