import { 
    moveLineBtn ,
    deleteLineBtn ,
    dropMenuBtn
    } from "./create_list";

import {generateId} from "./create_list";

import { sideMenuDragAndDrop } from "./draggable";

export function sideMenu(){
    const sideMenuToDoFolder = document.querySelector(".folderTitle");

    if (!sideMenuToDoFolder) {
        console.error("folderTitle not found in DOM");
        return;
    }
    
    const folderTitle = document.createElement("input");
    folderTitle.classList.add("folderLists");
    folderTitle.value = "Folder 1";
    folderTitle.id = "folder_title_" + generateId();

    const dropDown = dropMenuBtn({ showAddaFolder: false , showDuplicate:false });

    // Append both to the container, not dropdown inside input
    sideMenuToDoFolder.append(dropDown, folderTitle);

    listNameInFolder(1);
    listNameInFolder(2);
    listNameInFolder(3);
    listNameInFolder(4);
    
    const listTodos = document.querySelector(".listTodos");

    if (listTodos) {
        sideMenuDragAndDrop(listTodos);
    } else {
        console.error("listTodos container not found in DOM");
    }
}

function listNameInFolder(name){
    const todoLine = document.createElement("li");
    todoLine.classList.add("listName");

    todoLine.draggable = false;
    
    const move_line_btn = moveLineBtn();

    const listTodos = document.querySelector(".listTodos");

    const todoText = document.createElement("input");
    todoText.classList.add("todoText")
    todoText.value = "To do List " + name ;
    todoText.id = "TodoName_" + generateId();

    todoLine.append(move_line_btn, todoText);
    
    listTodos.append(todoLine);
}