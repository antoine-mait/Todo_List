import { generateId } from "./create_list";

export class Todo {
    constructor(text = "", id = null , completed = false){
        this.completed = completed;
        this.id = id || generateId() ;
        this.text = text
    }
    toggle(){
        this.completed = !this.completed;
    }
}

export class List {
    constructor(titleValue = "", id = null, checkboxState, percentageSaved , todosSaved){
        this.title = titleValue;
        this.id = id || generateId();
        this.checkboxState = checkboxState || "show";
        this.percentage = percentageSaved;
        if (todosSaved && todosSaved.length > 0) {
            this.todos = todosSaved.map(todoData => {
                // Check if it's already a Todo instance
                if (todoData instanceof Todo) {
                    return todoData;
                }
                // Convert plain object to Todo instance
                return new Todo(
                    todoData.text,
                    todoData.id,
                    todoData.completed === "completed"  // Convert string to boolean
                );
            });
        } else {
            this.todos = [];
        };
    }
    addTodo(text = ""){
        const newTodo = new Todo(text);
        this.todos.push(newTodo);
        return newTodo ;
    }
    removeTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
    getCompletionPercentage(){
        const total = this.todos.length;
        if ( total === 0 ) return 0;
        const completed = this.todos.filter(todo => todo.completed === true).length;

        const percentage = Math.round((completed / total) * 100);
        return percentage
    }
    toggleExpended(){
        this.checkboxState = this.checkboxState === "show" ? "hide" : "show";
    }
}

export class Folder {
    constructor(name, id = null){
        if (typeof name === "string"){
            this.name = name;
            this.id = id || "Folder_" + name;
        } else {
            this.name = name.folderName;
            this.id = name.folderId;
        }
       
        this.listNames = [];
    }
    addlist(listName){
        if (!this.listNames.includes(listName)){
            this.listNames.push(listName);
        }
    }

    removeList(listName){
        this.listNames = this.listNames.filter( name => name !== listName);
    }

    hasLists(){
        return this.listNames.length > 0;
    }

    toJSON(){
        return{
            folderName : this.name,
            folderId: this.id,
            lists: this.listNames.map(name =>({ listName : name}))
        };
    }
}