import {
createListFromTitle
}
    from "./create_list.js";

import {
sideMenu
} from "./sideMenu.js";

export function storeData() {
    // Store Lists with Todos 
    const lists = document.querySelectorAll(".list");
    let allLists = [];

    for (let listElement of lists) {
        let todos = listElement.querySelectorAll(".todo_line_wrapper");
        const checkboxEl = listElement.querySelector(".checkBox");
        let checkboxState = checkboxEl.classList.contains("show") ? "show" : "hide";
        const percentage = listElement.querySelector(".percentage");

        let list = {
            listName: listElement.querySelector(".new_title").value,
            id: listElement.id,
            draggable: listElement.draggable,
            percentage: percentage.textContent,
            checkbox: checkboxState,
            todos: [],
        }

        for (let todoElement of todos) {
            const checkboxEl = todoElement.querySelector(".delete_line_btn");
            let checkboxState = checkboxEl.classList.contains("completed") ? "completed" : "not-completed";

            let todo = {
                text: todoElement.querySelector(".todo-text").value,
                id: todoElement.querySelector(".todo-text").id,
                draggable: todoElement.draggable,
                completed: checkboxState,
            };
            list.todos.push(todo);
        }
        allLists.push(list);
    }
    // Store Folders in save menu
    const toDoAppFolder = document.querySelectorAll(".folderHeader")
    let allFolders = [];

    for (let folderElement of toDoAppFolder) {
        let folderName = folderElement.querySelector(".folderLists").value;

        const divFolder = folderElement.parentElement;
        const todosList = divFolder.querySelector(".listTodos")

        let folder = {
            folderName: folderName,
            lists: []
        }

        if (todosList) {
            const listElements = todosList.querySelectorAll(".listName");
            for (let listElement of listElements) {
                let list = {
                    listName: listElement.querySelector(".todoText").value
                }
                folder.lists.push(list)
            }
        }

        allFolders.push(folder)
    }

    localStorage.setItem('lists', JSON.stringify(allLists));
    localStorage.setItem('folders', JSON.stringify(allFolders));
}

export function restoreData() {
    const storedUserListsData = localStorage.getItem('lists')
    const storedUserFoldersData = localStorage.getItem('folders')

    console.log("restore Data")
    if (storedUserListsData) {
        const userListsData = JSON.parse(storedUserListsData)
        userListsData.forEach(list => {
            createListFromTitle(list.listName, list.id, list.checkbox, list.percentage, list.todos)
        });

    } else {
        console.log('User data not found in local storage')
    }

    if (storedUserFoldersData) {
        const userFoldersData = JSON.parse(storedUserFoldersData)
        userFoldersData.forEach(folders => {
            sideMenu(folders)
        });

    }
}
