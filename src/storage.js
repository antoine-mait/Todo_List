export function storeData() {
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
            console.log(todo)
        }
        allLists.push(list);
    }

    localStorage.setItem('lists', JSON.stringify(allLists));
    
}

export function restoreData() {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
        const userData = JSON.parse(storedUserData)
        // You can use userData here...
    } else {
        console.log('User data not found in local storage')
    }
}

export function deleteData() {
    localStorage.removeItem(key)
    localStorage.clear()
}

