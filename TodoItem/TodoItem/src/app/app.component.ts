import { Component } from '@angular/core';
import { TodoList } from './todoList';
import { TodoItem } from './todoItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TodoItem';
  public list= new TodoList("Fatema", 
  [new TodoItem("Angular/material",true),
  new TodoItem("Typescript method"),
  new TodoItem("Js code"),
  new TodoItem("Js code"),
  new TodoItem("Js code"),
]);

  get username():string{
    return this.list.user;
  }
  get itemCount():number{
    return this.list.items.filter(item=> !item.complete).length;
  }

}
