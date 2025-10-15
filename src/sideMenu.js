import { 
    moveLineBtn ,
    deleteLineBtn ,
    dropMenuBtn
    } from "./create_list";

import {generateId} from "./create_list";

import { sideMenuDragAndDrop, folderDragAndDrop } from "./draggable";

let count = 0;

export function sideMenu(name){
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

    divFolder.dataset.folderId = count;
    
    if (name){
        console.log("side menu Name")
        folderTitle.value = name;
        folderTitle.id = "Folder_" + name;
        divFolder.id = "div_Folder_" + name;
    } else {
        folderTitle.value = "Folder " + count;
        folderTitle.id = "Folder_" + count;
        divFolder.id = "div_Folder_" + count;
    }
    

    const dropDown = dropMenuBtn({ showAddaFolder: false , showDuplicate:false });

    // Append both to the container, not dropdown inside input
    folderHeader.append(dropDown , folderTitle)
    divFolder.append(folderHeader)

    sideMenuToDoFolder.append(divFolder);

    folderDragAndDrop();

}

export function listNameInFolder(name , folderName){
    const folderId = folderName.replace("Folder ", "");
    const divFolder = document.getElementById("div_Folder_" + folderId);
    // div_Folder_Shopping
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
    todoLine.id = name;
    
    const delete_line_btn = dropMenuBtn({ showAddaFolder: false , showDuplicate:false });

    const todoText = document.createElement("input");
    todoText.classList.add("todoText");
    todoText.value = name;
    todoText.id = "TodoName_" + generateId();

    todoLine.append(delete_line_btn, todoText);
    ulListTodo.append(todoLine);

    sideMenuDragAndDrop(ulListTodo);

    folderDragAndDrop();
}