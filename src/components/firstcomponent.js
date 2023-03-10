import { firstcomponentservice } from "../services/firstcomponentservice.js";
const itemtemplate = document.createElement("template")
itemtemplate.innerHTML = `
<style>
    @import url('./src/components/firstcomponent.css')
</style>
<div class="todo-item">
    <input class="todo-check" type="checkbox"/>
    <div class="todo-content">
        <input class="content-input" hidden type="text"/>
        <span class="content-display"></span>
    </div>
    <div class="spacer"></div>
    <button class="delete-todo-item-btn">✕</button>
</div>
`;
export class itemcomponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.appendChild(itemtemplate.content.cloneNode(true))
        this.editingContent = false;
        this.mouseDownEl = null;
        this.todoItem = this.shadowRoot.querySelector(".todo-item");

        this.todoCheck = this.todoItem.querySelector(".todo-check");
        this.todoContent = this.todoItem.querySelector(".todo-content");
        this.contentInput = this.todoContent.querySelector(".content-input");
        this.contentDisplay =
            this.todoContent.querySelector(".content-display");
        this.deleteTodoItemBtn = this.todoItem.querySelector(
            ".delete-todo-item-btn"
        );
    }
    connectedCallback() {
        this.contentInput.value = " task " + this.id
        this.contentDisplay.innerHTML = this.contentInput.value;
        firstcomponentservice.additem(this.id, this.contentInput.value, false);
        this.contentDisplay.addEventListener("click", (e) => this.editContent(e));
        this.todoItem.addEventListener("mousedown", (e) => this.itemclicked(e));
        document.addEventListener("mousedown", (e) => this.documentclicked(e));
        this.deleteTodoItemBtn.addEventListener("click", (e) => this.deleteTodoItem(e));
        this.todoCheck.addEventListener("click", (e) => this.togglechecked(e));
    }
    editContent(e) {
        e.stopPropagation();
        if (!this.todoCheck.checked) { this.editingContent = true; this.contentInput.hidden = false; this.contentInput.select(); this.contentDisplay.hidden = true };
    }
    documentclicked (e) {
        if (this.editingContent && (!this.mouseDownEl || !this.mouseDownEl.matches(".content-input"))){this.saveContent(e)}
    }
    itemclicked (e) {
        this.mouseDownEl = e.target
    }
    saveContent (e) {
        e.stopPropagation ();
        this.editingContent = false;
        this.contentDisplay.innerHTML = this.contentInput.value
        this.contentInput.hidden = true
        this.contentDisplay.hidden = false
        firstcomponentservice.updateitem (this.id, this.contentInput.value);
    }
    togglechecked (e) {
        e.stopPropagation ();
        if (e.target.checked){this.contentDisplay.classList.add("strike-through")}
        else {this.contentDisplay.classList.remove("strike-through")}
        firstcomponentservice.checkeditem(this.id, e.target.checked)
    }
    deleteTodoItem (e) {
        e.stopPropagation ();
        let todo = this;
        if (todo.parentNode && todo.parentNode.matches(".todo-items"))
        {
            firstcomponentservice.deleteitem(todo.id);
            todo.parentNode.removeChild(todo)
        }
    }
    disconnectedCallback (){
        this.todoCheck.removeEventListener ("click",(e)=>this.togglechecked(e))
    }
    
    

}