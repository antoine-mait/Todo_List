export default function createList(){
    const content = document.querySelector("#List_container");
    content.innerHTML = "";

    const list_box = document.createElement("div");
    list_box.classList.add("list_box");
    
    const input_title = document.createElement("input");
    input_title.classList.add("input");
    input_title.id = "title";
    input_title.placeholder= "Type your list name....";
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

    choice_div.append(create_list , cancel_list_btn);
    list_box.append(input_title , choice_div);
    content.append(list_box);

    cancel_list_btn.addEventListener("click", function(){
        const addList_btn = document.createElement("button");
        addList_btn.id = "add_list";
        addList_btn.innerHTML = "Add List";
        
        content.innerHTML = "";
        content.append(addList_btn);
        });
}

export const addList_btn = document.querySelector("#add_list");

