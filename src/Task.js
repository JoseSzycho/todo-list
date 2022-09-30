import { DOM } from "./DOM.js";
import {parse, format} from 'date-fns';


class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "unchecked"
        this.id = title.hashCode();
    }  

    static add(projectName){
        event.preventDefault(); //Disable refresh after submit

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value || null;

        let dueDay = document.getElementById("due-date").value;
        dueDay = parse(dueDay.replace("-",".").replace("-",".").replace("-","."), "yyyy.MM.dd", new Date())
        dueDay = format(dueDay, 'dd MMM yyyy');
        console.log(dueDay)
        const dueDate =  dueDay || "No date";
//parse(dueDay.replace("-",".").replace("-",".").replace("-","."), "yyyy.MM.dd", new Date())
        const priority = document.getElementById("priority").value;

        //add validation logic.. pendent to do this  
        const newTask = new Task(title, description, dueDate, priority);
        this.storeKey(newTask.id, projectName);
        window.localStorage.setItem(newTask.id, JSON.stringify(newTask));
        DOM.showAllTasks(projectName);

    }
    
    static getKeysByProject(projectName){
        let filteredKeys = {
            "id":[],
            "projectName": []
        }
        let keys = JSON.parse(window.localStorage.getItem("taskKeys"));

        if(projectName == "Inbox"){
            return keys;
        }

        if(projectName == "Today"){
            keys = Task.getTodayKeys(keys);
            return keys;
        }

        for(let el in keys["projectName"]){
            if( keys["projectName"][el] == projectName){
                filteredKeys.id.push(keys["id"][el]);
                filteredKeys.projectName.push(keys["projectName"][el])
            };
        }
        return filteredKeys;
    }

    static storeKey(id, projectName){
        if(window.localStorage.getItem("taskKeys") == null){
            let taskIdentification = {
                id: [id],
                projectName : [projectName]
            };
            window.localStorage.setItem("taskKeys", JSON.stringify(taskIdentification));
            return;
        }
       
        let taskIdentification = JSON.parse(window.localStorage.getItem("taskKeys"));
        taskIdentification["id"].push(id);
        taskIdentification["projectName"].push(projectName);
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
        projectNames["projectName"].push(projectName);
        window.localStorage.setItem("projectNames", JSON.stringify(projectNames));
    }

    static getProjectNames(){
        if(JSON.parse(window.localStorage.getItem("projectNames")) == null) return null;
        let projectNames = JSON.parse(window.localStorage.getItem("projectNames"));
        projectNames = projectNames["projectName"].map(name => name)
        return projectNames;
    }

    static toggleStatus(taskId){
        let task = JSON.parse(window.localStorage.getItem(taskId));
        if(task.status == "checked") task.status = "unchecked";
        else task.status = "checked";
        window.localStorage.setItem(taskId, JSON.stringify(task));
    }

    static delete(taskId){
        window.localStorage.removeItem(taskId);
        let projectNames = JSON.parse(window.localStorage.getItem("taskKeys"));
        
        for(let i in projectNames["id"]){
            if(projectNames["id"][i] == taskId){
                projectNames["id"].splice(i,1);
                projectNames["projectName"].splice(i,1);
                window.localStorage.setItem("taskKeys", JSON.stringify(projectNames));
                return;
            }
        }
    }

    static getTodayKeys(keys){
        return keys;
    }
    
}

export {Task};