import { TodoItem } from "./todoItem";
export class TodoList{
    constructor(public user:string, private todoitems:TodoItem[]){

    }
    get items():readonly TodoItem[]{
        return this.todoitems;
    }

    additem(task:string){
        
     this.todoitems.push(new TodoItem(task));
    }
}