//imports
import { Task } from "./Task.js"
import { DOM } from "./DOM.js"


//Adds hash prototype to create unique IDs for task
String.prototype.hashCode = function() {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const newTaskButton = document.getElementById("new-task");
newTaskButton.addEventListener("click", () => DOM.openForm());


