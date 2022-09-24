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
        window.localStorage.setItem(newTask.id, JSON.stringify(newTask));
    }
}

export {Task};