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
class list {
    constructor(titleValue = "", id = null, checkboxState, percentageSaved , todosSaved){
        this.title = titleValue;
        this.id = id || generateId();
        this.checkboxState = checkboxState || "show";
        this.percentage = percentageSaved;
        this.todos = todosSaved || [];
    }
    addTodo(text){
        const newTodo = new Todo(text);
        this.todos.push(newTodo);
    }
    removeTodo(id) {
        // use filter() to remove the todo with matching id
    }
    getCompletionPercentage(){
        // count ++
        //  divide by total and *100
        //  return % 
    }
}