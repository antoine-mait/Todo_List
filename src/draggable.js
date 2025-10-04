const content = document.querySelector("#List_container");

export function setupDragAndDrop() {
    const listsDiv = document.querySelectorAll(".list");
    let draggedList = null;
    let touchData = { startY: 0, currentElement: null };

    listsDiv.forEach(list => {
        const newList = list.cloneNode(true);
        list.parentNode.replaceChild(newList, list);

        // Desktop drag events
        newList.addEventListener("dragstart", () => {
            draggedList = newList;
            newList.classList.add("dragging");
        });

        newList.addEventListener("dragend", () => {
            newList.classList.remove("dragging");
        });

        newList.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        newList.addEventListener("drop", function () {
            if (draggedList !== this) {
                const allLists = Array.from(content.querySelectorAll(".list"));
                const draggedIndex = allLists.indexOf(draggedList);
                const targetIndex = allLists.indexOf(this);

                if (draggedIndex < targetIndex) {
                    this.parentNode.insertBefore(draggedList, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedList, this);
                }
            }
        });

        // Mobile touch events for list
        newList.addEventListener("touchstart", (e) => {
            // Only drag from the list title area, not from todos
            if (e.target.closest(".checkBox")) return;
            
            draggedList = newList;
            touchData.currentElement = newList;
            touchData.startY = e.touches[0].clientY;
            newList.classList.add("dragging");
        });

        newList.addEventListener("touchmove", (e) => {
            if (touchData.currentElement !== newList) return;
            
            e.preventDefault();
            const touch = e.touches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const listBelow = elementBelow?.closest(".list");

            if (listBelow && listBelow !== draggedList) {
                const allLists = Array.from(content.querySelectorAll(".list"));
                const draggedIndex = allLists.indexOf(draggedList);
                const targetIndex = allLists.indexOf(listBelow);

                if (draggedIndex < targetIndex) {
                    listBelow.parentNode.insertBefore(draggedList, listBelow.nextSibling);
                } else {
                    listBelow.parentNode.insertBefore(draggedList, listBelow);
                }
            }
        });

        newList.addEventListener("touchend", () => {
            if (touchData.currentElement === newList) {
                newList.classList.remove("dragging");
                draggedList = null;
                touchData.currentElement = null;
            }
        });

        // Re-initialize todo drag and drop for this list's todos
        const checkBox = newList.querySelector(".checkBox");
        if (checkBox) {
            setupTodoDragAndDrop(checkBox);
        }
    });
}

export function setupTodoDragAndDrop(checkBox) {
    const todoLines = checkBox.querySelectorAll(".todo_line_wrapper");
    let draggedTodo = null;
    let touchData = { startY: 0, currentElement: null, isDragging: false };

    todoLines.forEach(todo => {
        const newTodo = todo.cloneNode(true);
        todo.parentNode.replaceChild(newTodo, todo);

        newTodo.draggable = false;
        
        const moveBtn = newTodo.querySelector(".move_line_btn");
        
        // Desktop: Make move button initiate drag
        moveBtn.addEventListener("mousedown", () => {
            newTodo.draggable = true;
        });
        
        moveBtn.addEventListener("mouseup", () => {
            newTodo.draggable = false;
        });

        // Desktop drag events
        newTodo.addEventListener("dragstart", (e) => {
            draggedTodo = newTodo;
            newTodo.classList.add("dragging");
            const textarea = newTodo.querySelector(".todo-text");
            if (!textarea.dataset.originalHeight) {
                textarea.dataset.originalHeight = textarea.style.height || 'auto';
            }
            const currentHeight = textarea.getBoundingClientRect().height;
            textarea.style.height = currentHeight + "px";
        });

        newTodo.addEventListener("dragend", () => {
            newTodo.classList.remove("dragging");
            newTodo.draggable = false;
            const textarea = newTodo.querySelector(".todo-text");
            if (textarea.dataset.originalHeight) {
                textarea.style.height = textarea.dataset.originalHeight;
                delete textarea.dataset.originalHeight;
            }
        });

        newTodo.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        newTodo.addEventListener("drop", function (e) {
            e.preventDefault();
            if (draggedTodo !== this) {
                const allTodos = Array.from(checkBox.querySelectorAll(".todo_line_wrapper"));
                const draggedIndex = allTodos.indexOf(draggedTodo);
                const targetIndex = allTodos.indexOf(this);

                if (draggedIndex < targetIndex) {
                    this.parentNode.insertBefore(draggedTodo, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedTodo, this);
                }
            }
        });

        const textarea = newTodo.querySelector(".todo-text");
                textarea.addEventListener("input", function() {
                    this.style.height = "auto";
                    this.style.height = this.scrollHeight + "px";
                });

        // Mobile: Touch events on move button only
        moveBtn.addEventListener("touchstart", (e) => {
            e.stopPropagation();
            e.preventDefault();
            draggedTodo = newTodo;
            touchData.currentElement = newTodo;
            touchData.isDragging = true;
            touchData.startY = e.touches[0].clientY;
            newTodo.classList.add("dragging");
            
            const textarea = newTodo.querySelector(".todo-text");
            if (!textarea.dataset.originalHeight) {
                textarea.dataset.originalHeight = textarea.style.height || 'auto';
            }
            const currentHeight = textarea.getBoundingClientRect().height;
            textarea.style.height = currentHeight + "px";
        });

        moveBtn.addEventListener("touchmove", (e) => {
            if (!touchData.isDragging || touchData.currentElement !== newTodo) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const touch = e.touches[0];
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const todoBelow = elementBelow?.closest(".todo_line_wrapper");

            if (todoBelow && todoBelow !== draggedTodo && todoBelow.parentElement === checkBox) {
                const allTodos = Array.from(checkBox.querySelectorAll(".todo_line_wrapper"));
                const draggedIndex = allTodos.indexOf(draggedTodo);
                const targetIndex = allTodos.indexOf(todoBelow);

                if (draggedIndex < targetIndex) {
                    todoBelow.parentNode.insertBefore(draggedTodo, todoBelow.nextSibling);
                } else {
                    todoBelow.parentNode.insertBefore(draggedTodo, todoBelow);
                }
            }
        });

        moveBtn.addEventListener("touchend", (e) => {
            e.stopPropagation();
            newTodo.classList.remove("dragging");
            draggedTodo = null;
            touchData.currentElement = null;
            touchData.isDragging = false;
            
            const textarea = newTodo.querySelector(".todo-text");
            if (textarea.dataset.originalHeight) {
                textarea.style.height = textarea.dataset.originalHeight;
                delete textarea.dataset.originalHeight;
            }
        });
    });
}