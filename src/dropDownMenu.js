const content = document.querySelector("#List_container");
let count = 1

import {generateId} from "./create_list"
import { setupDragAndDrop, setupTodoDragAndDrop } from "./draggable.js"

export function deleteOption(list){
    list.remove();
    console.log("Delete option");
}
export function addToFolderOption(){
    // even listener click 
    // create dropdown menu with all Folder names
    document.addEventListener("click", (e) => {
        const dropDown = dropMenuBtn()
    })
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

    const addListBtn = container.querySelector("#add_list");
    container.append(cloneList, addListBtn);

    const dropdown_content = cloneList.querySelector(".dropdown_content");
    dropdown_content.classList.remove("show");
    dropdown_content.classList.add("hide");

    const checkBox = cloneList.querySelector(".checkBox")
    setupDragAndDrop();
    setupTodoDragAndDrop(checkBox);
}
