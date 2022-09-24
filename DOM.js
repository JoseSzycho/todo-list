import { Task } from "./Task.js"

const DOM = (() =>{

    const openForm = () => {
        hideNewTaskButton();
        addForm();
    };

    const closeForm = () => {
        const form = document.querySelector("form");
        form.remove();
        showNewTaskButton();
    }

    const hideNewTaskButton = () => {
      document.getElementById("new-task").classList.add("hide");
    }

    const showNewTaskButton = () => {
        document.getElementById("new-task").classList.remove("hide"); 
        document.getElementById("new-task").classList.add("show");
    }
    const addForm = () => {
      const form = document.createElement("form");
        form.innerHTML = `
          <form>
            <fieldset>
              <legend>Task details</legend>
              <div class="title">
                  <label for="title">Title</label>
              <input type="text" id="title">
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
        addEventListener("submit", () => Task.add());
        addEventListener("reset", closeForm)
    };

    return {openForm};
}
)();

export {DOM};