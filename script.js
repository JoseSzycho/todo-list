class Task{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }  
}

const task = new Task("Do homework", "Description", "5/5/5", "high");

localStorage.setItem('mi Gato', 'Juann');