import { setupDragAndDrop, setupTodoDragAndDrop } from "./draggable.js"

const content = document.querySelector("#List_container");

//Use crypto.randomUUID() for unique IDs instead of global counter
export function generateId() {
    return crypto.randomUUID();
}

export default function createList(name) {

    const addList_btn = document.querySelector("#add_list");
    addList_btn.remove();

    const list_box = document.createElement("div");
    list_box.classList.add("list_box");
    list_box.dataset.component = "list_box";

    const input_title = document.createElement("input");
    input_title.classList.add("input");
    input_title.id = "title";
    input_title.placeholder = "Type your list name....";
    input_title.type = "text";

    const choice_div = document.createElement("div");
    choice_div.classList.add("creation");

    const create_list = document.createElement("button");
    create_list.classList.add("button");
    create_list.id = "create_list";
    create_list.innerHTML = "Create list";

    const cancel_list_btn = document.createElement("button");
    cancel_list_btn.classList.add("button");
    cancel_list_btn.id = "cancel_list";
    cancel_list_btn.innerHTML = " X ";

    choice_div.append(create_list, cancel_list_btn);
    list_box.append(input_title, choice_div);
    content.append(list_box);

    document.getElementById("title").focus();

}

export function createAddListButton() {
    const addList_btn = document.createElement("button");
    addList_btn.id = "add_list";
    addList_btn.innerHTML = "Add List";

    content.append(addList_btn);
};

function validateTitle(title) {
    return title && title.trim().length > 0;
}

export function createListFromTitle(titleValue) {

    if (!validateTitle(titleValue)) {
        alert("Please enter a list name");
        return;
        }

    const listDiv = document.createElement("div");
    listDiv.classList.add("list");
    const listId = generateId();
    listDiv.id = "list_" + listId;
    listDiv.draggable = true;

    const new_title = document.createElement("input");
    new_title.classList.add("new_title");
    new_title.id = "title" + generateId();
    new_title.value = titleValue;
    new_title.addEventListener("focus", function() {
        this.select();
    });

    const dropdown = dropMenuBtn();

    const title_box = document.createElement("div");
    title_box.classList.add("title_box");

    const checkBox = document.createElement("div");
    checkBox.classList.add("checkBox");

    // Create the + button , to create new todo 
    createAddTodoButton(checkBox);

    // Create the todo line
    createTodoLine(checkBox);

    const percentage = percentageCompletion();
    
    title_box.append(new_title, dropdown);
    listDiv.append(title_box, percentage, checkBox );
    content.append(listDiv);

    setupDragAndDrop();
    setupTodoDragAndDrop(checkBox);
}

export function dropMenuBtn(options = {}){
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown"); 
    
    const option_btn = document.createElement("button");
    option_btn.classList.add("option_btn");
    option_btn.innerHTML = " ⋮ ";

    const dropdown_menu = document.createElement("div");
    dropdown_menu.classList.add("dropdown_content");

    const del_option = document.createElement("a");
    del_option.classList.add("delete");
    del_option.innerHTML = "Delete";

    const duplicate_option = document.createElement("a");
    duplicate_option.classList.add("duplicate");
    duplicate_option.innerHTML = "Duplicate";

    // Always append delete first
    dropdown_menu.append(del_option);
    
    // Conditionally append duplicate
    if (options.showDuplicate !== false) {
        dropdown_menu.append(duplicate_option);
    }
    
    // Conditionally create and append add_to_folder
    if (options.showAddaFolder !== false) {
        const add_to_folder_option = document.createElement("a");
        add_to_folder_option.classList.add("add_to_folder");
        add_to_folder_option.innerHTML = "Add to a folder";
        dropdown_menu.append(add_to_folder_option);
    }
    
    dropdown.append(option_btn, dropdown_menu);
    
    return dropdown;
}

export function dropFolderMenuBtn(parent){
    const dropdown = parent.querySelector(".dropdown")

    let dropdownFoldersNames = dropdown.querySelector(".dropdownFoldersNames");
    
     if (!dropdownFoldersNames) {
        // Create it only once
        dropdownFoldersNames = document.createElement("div");
        dropdownFoldersNames.classList.add("dropdownFoldersNames");
        dropdown.append(dropdownFoldersNames);
    }   
    
    dropdownFoldersNames.innerHTML = "";

    const folderNames = document.querySelectorAll(".folderLists");

    for (let folder of folderNames) {
        const folderLink = document.createElement("a");
        folderLink.innerHTML = folder.value;
        folderLink.classList.add("folder-option");
        dropdownFoldersNames.append(folderLink);
    }
    
    // Toggle show/hide
    if (dropdownFoldersNames.classList.contains("show")) {
        dropdownFoldersNames.classList.remove("show");
        dropdownFoldersNames.classList.add("hide");
    } else {
        dropdownFoldersNames.classList.remove("hide");
        dropdownFoldersNames.classList.add("show");
    }
    
    return dropdown;
}

function percentageCompletion(listElement){
    const percentage = document.createElement("div");
    percentage.classList.add("percentage");
    percentage.innerHTML = "0% Done";
    return percentage;
}

export function createTodoLine(checkBox){
    const wrapper = document.createElement("div");
    wrapper.classList.add("todo_line_wrapper");
    wrapper.draggable = true;

    const todoId = generateId();

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "todo_line_" + todoId;
    checkbox.classList.add("todo-checkbox");

    const label = document.createElement("label");
    label.htmlFor = "todo_line_" + todoId;
    label.classList.add("todo-label");

    const todoTextarea = document.createElement("textarea");
    todoTextarea.classList.add("todo-text");
    todoTextarea.id = "todo_text_" + todoId;
    todoTextarea.placeholder = "To do : ...."
    todoTextarea.rows = 1;
    todoTextarea.classList.add("not-completed");
    
    // Adjust input box size base on user type 
    todoTextarea.addEventListener("input", function() {
        this.style.height = "auto"; // ← 'this' is the textarea
        this.style.height = this.scrollHeight + "px";
    });

    const delete_line_btn = deleteLineBtn();

    const move_line_btn = moveLineBtn();

    label.appendChild(todoTextarea);
    wrapper.append(move_line_btn, checkbox, label, delete_line_btn);
    checkBox.append(wrapper);

    percentageCalculation(wrapper);

    return wrapper;
}

export function moveLineBtn(){
    const move_line_btn = document.createElement("button");
    move_line_btn.classList.add("move_line_btn");
    move_line_btn.innerText = " ⋮ ";
    return move_line_btn
}

export function deleteLineBtn(){
    const delete_line_btn = document.createElement("button");
    delete_line_btn.classList.add("delete_line_btn");
    delete_line_btn.innerText = " X ";
    delete_line_btn.classList.add("not-completed");
    return delete_line_btn
}
function createAddTodoButton(checkBox){
    const addCheckLine = document.createElement("button");
    addCheckLine.classList.add("addCheckLine");
    addCheckLine.innerHTML = "+";
    checkBox.append(addCheckLine);
    return addCheckLine;
}

export function addNewTodoLine(addButton) {
    const checkBox = addButton.parentElement;
    const newLine = createTodoLine(checkBox);
    checkBox.appendChild(newLine);
    setupTodoDragAndDrop(checkBox);
}

export function toggleTodoCompletion(checkbox) {
    const wrapper = checkbox.closest(".todo_line_wrapper");
    const textarea = wrapper.querySelector(".todo-text");
    const deleteBtn = wrapper.querySelector(".delete_line_btn");
    
    if (checkbox.checked) {
        percentageCalculation(wrapper);
        textarea.classList.add("completed");
        textarea.classList.remove("not-completed");
        deleteBtn.classList.add("completed");
        deleteBtn.classList.remove("not-completed");
    } else {
        percentageCalculation(wrapper);
        textarea.classList.remove("completed");
        textarea.classList.add("not-completed");
        deleteBtn.classList.remove("completed");
        deleteBtn.classList.add("not-completed");
    }
    percentageCalculation(wrapper);
}

function percentageCalculation(wrapper){
    const listElement = wrapper.closest(".list");
    if (listElement) {
        const percentageElement = listElement.querySelector(".percentage");
        if (percentageElement) {
            // Count all todos in THIS list only
            const allTodos = listElement.querySelectorAll(".todo-checkbox");
            const checkedTodos = listElement.querySelectorAll(".todo-checkbox:checked");
            
            const totalCount = allTodos.length;
            const checkedCount = checkedTodos.length;
            
            let calculePercentage = 0;
            if (totalCount > 0) {
                calculePercentage = Math.round((checkedCount / totalCount) * 100);
            }
            
            percentageElement.innerHTML = calculePercentage + "% Done";
            console.log("List:", listElement.id, "- Percentage:", calculePercentage);

            if (calculePercentage === 100 && totalCount > 0){
                listElement.style.backgroundColor = "var(--color-checked-background)";
            } else {
                listElement.style.backgroundColor = "var(--color-background)";
            }
        }
    }
    
}

