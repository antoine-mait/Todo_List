import { 
    moveLineBtn ,
    deleteLineBtn ,
    dropMenuBtn
    } from "./create_list";

import {generateId} from "./create_list";

import { sideMenuDragAndDrop } from "./draggable";

let count = 0;

export function sideMenu(){
    const sideMenuToDoFolder = document.querySelector(".folderTitle");

    if (!sideMenuToDoFolder) {
        console.error("folderTitle not found in DOM");
        return;
    }
    
    const divFolder = document.createElement("div");
    divFolder.classList.add("divFolder");

    const folderHeader = document.createElement("div");
    folderHeader.classList.add("folderHeader");

    count++;

    const folderTitle = document.createElement("input");
    folderTitle.classList.add("folderLists");
    folderTitle.value = "Folder " + count;
    folderTitle.id = "Folder_" + count;

    divFolder.id = "div_Folder_" + count;

    
    const dropDown = dropMenuBtn({ showAddaFolder: false , showDuplicate:false });

    // Append both to the container, not dropdown inside input
    folderHeader.append(dropDown , folderTitle)
    divFolder.append(folderHeader)

    sideMenuToDoFolder.append(divFolder);

}

export function listNameInFolder(name , folderName){
    const folderId = folderName.replace("Folder ", "");
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
    
    const move_line_btn = moveLineBtn();

    const todoText = document.createElement("input");
    todoText.classList.add("todoText");
    todoText.value = name;
    todoText.id = "TodoName_" + generateId();

    todoLine.append(move_line_btn, todoText);
    ulListTodo.append(todoLine);

    sideMenuDragAndDrop(ulListTodo);
}