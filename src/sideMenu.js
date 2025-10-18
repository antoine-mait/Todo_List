import {
    dropMenuBtn
} from "./create_list";

import { generateId } from "./create_list";

import {
    sideMenuDragAndDrop, folderDragAndDrop
} from "./draggable";


import {
    Folder
} from "./class_constructor.js"

let count = 0;

export function sideMenu(nameOrObject) {
    const folder = new Folder(nameOrObject);
    
    const sideMenuToDoFolder = document.querySelector(".folderTitle");
    if (!sideMenuToDoFolder) {
        console.error("folderTitle not found in DOM");
        return;
    }

    // Create DOM elements
    const divFolder = document.createElement("div");
    divFolder.classList.add("divFolder");
    divFolder.id = `div_${folder.id}`;

    const folderHeader = document.createElement("div");
    folderHeader.classList.add("folderHeader");

    const folderTitle = document.createElement("input");
    folderTitle.classList.add("folderLists");
    folderTitle.value = folder.name;
    folderTitle.id = folder.id;

    const dropDown = dropMenuBtn({ showAddaFolder: false, showDuplicate: false });

    folderHeader.append(dropDown, folderTitle);
    divFolder.append(folderHeader);
    
    sideMenuToDoFolder.append(divFolder);
    
    folderDragAndDrop();
    
    return folder;  // Return the folder instance
}

export function listNameInFolder(listName, folderNameOrId) {

    const folderId = folderNameOrId.replace("Folder ", "");
    const divFolder = document.getElementById("div_Folder_" + folderId);

    if (!divFolder) {
        console.error("Folder not found:", "div_Folder_" + folderId);
        return;
    }

    // Check if ul already exists, if not create it
    let ulListTodo = divFolder.querySelector(".listTodos");
    if (!ulListTodo) {
        ulListTodo = document.createElement("ul");
        ulListTodo.classList.add("listTodos");
        divFolder.append(ulListTodo);
    }

    const todoLine = document.createElement("li");
    todoLine.classList.add("listName");
    todoLine.draggable = false;
    todoLine.id = listName;

    const delete_line_btn = dropMenuBtn({ showAddaFolder: false, showDuplicate: false });

    const todoText = document.createElement("input");
    todoText.classList.add("todoText");
    todoText.value = listName;
    todoText.id = generateId();

    todoLine.append(delete_line_btn, todoText);
    ulListTodo.append(todoLine);

    sideMenuDragAndDrop(ulListTodo);

    folderDragAndDrop();
}

