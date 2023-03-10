import {
    firstcomponentservice
} from "./services/firstcomponentservice.js"
const AppTemplate = document.createElement("template");
AppTemplate.innerHTML = `
    <style>
        @import url('./src/appcomponent.css')
    </style>
    <div class="app-component">
        <div class="todo-list-container">
            <h1>Todo List</h1>
            <div class="todo-items">
            </div>
            <button class="add-todo-item-btn">+</button>
        </div>
    </div>
`;
export class appComponent extends HTMLElement {
    constructor (){
        super ()
        this.attachShadow({mode:"open"})
        this.shadowRoot.appendChild(AppTemplate.content.cloneNode(true))
        firstcomponentservice.initializestate([]);
        this.todoList = this.shadowRoot.querySelector(".todo-list-container");
        this.todoItems = this.todoList.querySelector(".todo-items");
        this.addTodoItemBtn = this.todoList.querySelector(".add-todo-item-btn");
    }
    connectedCallback (){
        this.addTodoItemBtn.addEventListener("click",(e)=>this.addTodoItem(e));
    }
    addTodoItem (e){
        e.stopPropagation()
        let todoItem = document.createElement("todo-item")
        appComponent.todoIdCount = appComponent.todoIdCount ?? 0;
        todoItem.id = appComponent.todoIdCount ++;
        this.todoItems.appendChild(todoItem)
        }
        disconnectedCallback() {}
}
