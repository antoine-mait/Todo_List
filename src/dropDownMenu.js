const content = document.querySelector("#List_container");
let count = 1

import {generateId} from "./create_list"
import { setupDragAndDrop, setupTodoDragAndDrop } from "./draggable.js"


export function deleteOption(parent){
    // Check if it's a folder (has divFolder as first child)
    const getdivFolder = parent.children[0];

    if (getdivFolder && getdivFolder.classList.contains("folderHeader")){
        
        const divFolder = getdivFolder.parentElement;
        if (divFolder) {
            divFolder.remove();
        }
        return;
    }
    
    // Check if it's a main list (not a list item in side menu)
    if (parent.classList.contains("list")){
        const listName = parent.children[0].children[0].value
        const sideMenuList = document.getElementById(listName)
        parent.remove();    
        if (sideMenuList){
            sideMenuList.remove();
        }
    }
}

export function addToFolderOption(parent){
    const title = parent.querySelector(".new_title")
    console.log(title.value);
    
}

export function duplicateOption(list , container){

    const cloneList = list.cloneNode(true);
    cloneList.id = "list_" + generateId();

    const newTitle = cloneList.querySelector(".new_title");
    newTitle.id = "title_" + generateId();

    let baseName;
    if (newTitle.value.includes("_copy_")) {
        baseName = newTitle.value.split("_copy_")[0];
    } else {
        baseName = newTitle.value;
    }

    // Find all lists with the same base name
    const allLists = container.querySelectorAll(".new_title");
    let maxCopy = 0;

    allLists.forEach(title => {
        if (title.value.startsWith(baseName)) {
            const match = title.value.match(/_copy_(\d+)$/);
            if (match) {
                maxCopy = Math.max(maxCopy, parseInt(match[1]));
            }
        }
    });

    newTitle.value = baseName + "_copy_" + (maxCopy + 1);

    const todoWrappers = cloneList.querySelectorAll(".todo_line_wrapper");
    todoWrappers.forEach(wrapper => {
        const newTodoId = generateId();
        
        const checkbox = wrapper.querySelector(".todo-checkbox");
        const label = wrapper.querySelector(".todo-label");
        const textarea = wrapper.querySelector(".todo-text");
        
        // Update all IDs and htmlFor attributes
        checkbox.id = newTodoId;
        label.htmlFor = newTodoId;
        textarea.id = newTodoId;
    });

    const addListBtn = container.querySelector("#add_list");
    container.prepend(addListBtn)
    container.append(cloneList);

    const dropdown_content = cloneList.querySelector(".dropdown_content");
    dropdown_content.classList.remove("show");
    dropdown_content.classList.add("hide");

    const checkBox = cloneList.querySelector(".checkBox")
    setupDragAndDrop();
    setupTodoDragAndDrop(checkBox);
}