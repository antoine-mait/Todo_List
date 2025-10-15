import "./styles.css";

import createList, {
  createAddListButton,
  createListFromTitle,
  addNewTodoLine,
  toggleTodoCompletion,
  dropFolderMenuBtn,
  createTodoLine,
  percentageCalculation,
} from "./create_list.js";

import {
  deleteOption,
  renameOption,
  addToFolderOption,
  duplicateOption
} from "./dropDownMenu.js";

import {
  sideMenu,
  listNameInFolder
} from "./sideMenu.js";

const listContainer = document.querySelector("#List_container")

// Initialize with default data on first load
function initializeDefaultData() {
  // Check if this is the first time loading (you can expand this later for localStorage)
  const hasExistingLists = document.querySelectorAll('.list').length > 0;

  if (!hasExistingLists) {
    // Remove the initial "Add List" button
    const initialAddBtn = document.querySelector("#add_list");
    if (initialAddBtn) {
      initialAddBtn.remove();
    }

    // Create default folders in side menu
    sideMenu("Shopping"); // Creates "Folder 1"
    sideMenu("Work"); // Creates "Folder 2"

    // Create a sample list with todos
    createListFromTitle("Shopping List");

    // Wait a tick for DOM to update, then add todos
    setTimeout(() => {
      const firstList = document.querySelector('.list');
      if (firstList) {
        const checkBox = firstList.querySelector('.checkBox');

        // Add multiple todos
        const todos = [
          { text: "Buy milk", checked: true },
          { text: "Get bread", checked: true },
          { text: "Pick up vegetables", checked: false },
          { text: "Buy coffee", checked: false }
        ];

        todos.forEach((todo, index) => {
          const wrapper = createTodoLine(checkBox);
          const textarea = wrapper.querySelector('.todo-text');
          const checkbox = wrapper.querySelector('.todo-checkbox');

          textarea.value = todo.text;
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";

          if (todo.checked) {
            checkbox.checked = true;
            toggleTodoCompletion(checkbox);
          }
        });
        // Add Shopping List to Folder 1
        listNameInFolder("Shopping List", "Shopping");
      }
    }, 100);

    // Create another list
    setTimeout(() => {
      createListFromTitle("Work Tasks");

      setTimeout(() => {
        const lists = document.querySelectorAll('.list');
        const secondList = lists[1];
        if (secondList) {
          const checkBox = secondList.querySelector('.checkBox');
          const wrapper = createTodoLine(checkBox);
          const textarea = wrapper.querySelector('.todo-text');
          textarea.value = "Finish project report";
          textarea.style.height = "auto";
          textarea.style.height = textarea.scrollHeight + "px";

          listNameInFolder("Work Tasks", "Work");
        }

        // Now add the "Add List" button at the very end
        createAddListButton();
      }, 150);
    }, 200);
  }
}
// Call initialization when DOM is ready
initializeDefaultData();

listContainer.addEventListener("keypress", (e) => {
  // Check if Enter key is pressed on the title input
  if (e.key === "Enter" && e.target.id === "title") {
    e.preventDefault();
    document.querySelector("#create_list").click();
  }
});

// Helper function to find the parent container (either .list or .folderTitle)
function getDropdownParent(element) {
  // First check if we're in a side menu folder header
  const folderHeader = element.closest(".folderHeader");
  if (folderHeader) {
    return folderHeader.closest(".divFolder");
  }
  
  // Then check if we're in a list name item (inside folder)
  const listNameItem = element.closest(".listName");
  if (listNameItem) {
    return listNameItem;
  }
  
  // Otherwise, return list or folderTitle as before
  return element.closest(".list") || element.closest(".folderTitle");
}

document.addEventListener("click", (e) => {

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
    const wrapper = e.target.closest(".todo_line_wrapper");
    const listElement = wrapper.closest(".list");

    wrapper.remove();

    if ( listElement ){
      const remainingWrapper = listElement.querySelector(".todo_line_wrapper");
      if ( remainingWrapper ){
        percentageCalculation(remainingWrapper);
      } else {
        const percentageElement = listElement.querySelector(".percentage");
        if ( percentageElement ){
          percentageElement.innerHTML = "0% Done";
          listElement.style.backgroundColor = "var(--color-background)";
        }
      }
    }
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
  if (e.target.classList.contains("option_btn")) {
    const parent = getDropdownParent(e.target);
    if (parent) {
      const dropdown_content = parent.querySelector(".dropdown_content");
      if (dropdown_content) {
        // Get mouse position
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Change positioning to fixed (relative to viewport)
        dropdown_content.style.position = "fixed";
        dropdown_content.style.left = mouseX + "px";
        dropdown_content.style.top = mouseY + "px";

        dropdown_content.classList.remove("hide");
        dropdown_content.classList.add("show");
      }
    }
    return;
  }

  // Duplicate list
  if (e.target.classList.contains("duplicate")) {
    const parent = getDropdownParent(e.target);
    if (parent) {
      const dropdown_content = parent.querySelector(".dropdown_content");
      if (dropdown_content) {
        dropdown_content.classList.add("hide");
        dropdown_content.classList.remove("show");
      }

      // Only duplicate if it's a list (not a folder)
      if (parent.classList.contains("list")) {
        const container = e.target.closest("#List_container");
        duplicateOption(parent, container);
      }
    }
    return;
  }

  // Delete list or folder
  if (e.target.classList.contains("delete")) {
    // First check if we're deleting a list item inside a folder (side menu)
    const listNameParent = e.target.closest(".listName");
    if (listNameParent) {
      // Just remove the list item from the folder
      listNameParent.remove();
      return; // Exit early, don't proceed to folder/list deletion
    }

    // If not a side menu list item, proceed with normal deletion
    const parent = getDropdownParent(e.target);
    if (parent) {
      deleteOption(parent);
    }
    return;
  }

  // Add to a folder
  if (e.target.classList.contains("add_to_folder")) {
    const parent = getDropdownParent(e.target);
    if (parent) {
      const dropdown_content = parent.querySelector(".dropdown_content");
      if (dropdown_content) {
        dropdown_content.classList.add("hide");
        dropdown_content.classList.remove("show");
      }
      dropFolderMenuBtn(parent);
    }
    return;
  }
  // Drop down menu on List
  if (e.target.classList.contains("folder-option")) {
    const dropdown_contents = document.querySelectorAll(".dropdownFoldersNames.show");
    dropdown_contents.forEach(dropdown => {
      dropdown.classList.remove("show");
      dropdown.classList.add("hide");
    });
    const list = e.target.closest(".list");
    const title = list.querySelector(".new_title")

    const folderName = e.target.innerHTML;

    listNameInFolder(title.value, folderName);
  }

  // Side menu Add a Folder Button
  if (e.target.id == "AddAFolder") {
    sideMenu()
  }

  // To do Folders show 
  if (e.target.classList.contains("subMenu")) {
    const folders = document.querySelector(".folders");
    const listContainer = document.getElementById("List_container");

    if (folders.classList.contains("show")) {
      listContainer.classList.remove("show");
      listContainer.classList.add("hide");

      folders.classList.remove("show");
      folders.classList.add("hide");
    } else {
      listContainer.classList.remove("hide");
      listContainer.classList.add("show");

      folders.classList.remove("hide");
      folders.classList.add("show");
    }

  }
});


// Hide dropDown menu by clicking anywhere
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("option_btn") && !e.target.closest(".dropdown_content")) {
    const dropdown_contents = document.querySelectorAll(".dropdown_content.show");
    dropdown_contents.forEach(dropdown => {
      dropdown.classList.remove("show");
      dropdown.classList.add("hide");
    });
    if (!e.target.classList.contains("folder-option") && !e.target.closest(".dropdown_content")) {
      const dropdown_contents = document.querySelectorAll(".dropdownFoldersNames.show");
      dropdown_contents.forEach(dropdown => {
        dropdown.classList.remove("show");
        dropdown.classList.add("hide");
      });
    }
  }

});