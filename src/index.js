import "./styles.css";

import createList, {
  createAddListButton,
  createListFromTitle,
  addNewTodoLine,
  toggleTodoCompletion
} from "./create_list.js";

import {
  deleteOption,
  renameOption,
  addToFolderOption,
  duplicateOption,
} from"./dropDownMenu.js";

document.querySelector("#List_container").addEventListener("keypress", (e) => {
  // Check if Enter key is pressed on the title input
  if (e.key === "Enter" && e.target.id === "title") {
    e.preventDefault();
    document.querySelector("#create_list").click();
  }
});

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

  // Option button dropDown menu
  
  if (e.target.classList.contains("option_btn")){
    const dropdown_content = e.target.closest(".list").querySelector(".dropdown_content")
    dropdown_content.classList.remove("hide")
    dropdown_content.classList.add("show")
    return
  }

  // Duplicate list
  if (e.target.classList.contains("duplicate")) {
    const list = e.target.closest(".list");
    const container = e.target.closest("#List_container");
    const dropdown_content = list.querySelector(".dropdown_content")

    dropdown_content.classList.add("hide");
    dropdown_content.classList.remove("show");
    duplicateOption(list , container);
    return;
  }

  // Delete list
  if (e.target.classList.contains("delete")) {
    const list = e.target.closest(".list");
    deleteOption(list);
    return;
  }

    // Add to a folder list
  if (e.target.classList.contains("add_to_folder")) {
    const list = e.target.closest(".list");
    const dropdown_content = list.querySelector(".dropdown_content")

    addToFolderOption(list);
    dropdown_content.classList.add("hide");
    dropdown_content.classList.remove("show");
    return;
  }

});

// Hide dropDown menu by clicking anywhere
document.addEventListener("click", (e) => {
  const dropdown_content = document.querySelector(".dropdown_content")

  if (dropdown_content && !e.target.classList.contains("option_btn") && !e.target.closest(".dropdown_content")){
    dropdown_content.classList.remove("hide")
    dropdown_content.classList.add("hide")
    return
  }
});