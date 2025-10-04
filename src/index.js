import "./styles.css";

import createList, {
  createAddListButton,
  createListFromTitle,
  addNewTodoLine,
  toggleTodoCompletion
} from "./create_list.js";

import { setupTodoDragAndDrop }
  from "./draggable.js";

document.querySelector("#List_container").addEventListener("click", (e) => {

  // "Add List" button - shows the list creation box
  if (e.target && e.target.id === "add_list") {
    createList();
    return;
  }

  // "Create list" button - validates and creates the actual list
  if (e.target && e.target.id === "create_list") {
    const titleInput = document.querySelector("#title");
    if (titleInput) {
      createListFromTitle(titleInput.value);
      const listBox = e.target.closest('[data-component="list_box"]');
      if (listBox) {
        listBox.remove();
      }
      createAddListButton();
    }
    return;
  }

  // "Cancel" button - closes list creation box
  if (e.target && e.target.id === "cancel_list") {
    const listBox = e.target.closest('[data-component="list_box"]');
    if (listBox) {
      listBox.remove();
    }
    createAddListButton();
    return;
  }

  // "X" button - deletes a todo line
  if (e.target.classList.contains("delete_line_btn")) {
    e.target.closest(".todo_line_wrapper").remove();
    return;
  }

  // Checkbox - marks todo as complete/incomplete
  if (e.target.classList.contains("todo-checkbox")) {
    toggleTodoCompletion(e.target);
    return;
  }

  // "+" button - adds a new todo line
  if (e.target.classList.contains("addCheckLine")) {
    addNewTodoLine(e.target);
    return;
  }
});

