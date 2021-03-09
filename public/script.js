"use strict";
class TodoList {
    constructor() {
        this.todoListe = document.querySelector('#todo ul');
        this.itemDisplay = document.querySelector('#todo');
    }
    addTodo(name) {
        //console.log(name);
        let todoData = `<li class="list-group-item"><input type="text"><label>${name}</label><span><i class="fas fa-edit edit"></i><i class="fas fa-save save"></i><i class="fas fa-trash delete"></i></span></li>`;
        this.todoListe.innerHTML += todoData;
        this.count(this.todoListe.getElementsByTagName("li").length);
    }
    count(val) {
        if (val < 1) {
            this.itemDisplay.innerHTML = `<h4 style="color:#fff">No records found to dispaly</h4>`;
        }
    }
    deleteTodo(name) {
        if (name.classList.contains('delete')) {
            name.parentElement.parentElement.remove();
        }
    }
    searchTodo(name) {
        Array.from(this.todoListe.children)
            .filter((item) => !item.textContent.toLowerCase().includes(name))
            .forEach((item) => item.classList.add('filtered'));
        Array.from(this.todoListe.children)
            .filter((item) => item.textContent.toLowerCase().includes(name))
            .forEach((item) => item.classList.remove('filtered'));
    }
    editTodo(name) {
        let editInput = name.parentElement.parentElement.querySelector('input');
        let editLabel = name.parentElement.parentElement.querySelector('label');
        if (name.tagName == 'I' && (name.classList.contains('edit') || name.classList.contains('save'))) {
            if (name.parentElement.parentElement.classList.contains('edit-mode')) {
                editLabel.innerText = editInput.value;
                name.previousElementSibling.style.display = 'inline-block';
                name.style.display = 'none';
            }
            else {
                editInput.value = editLabel.innerText;
                name.style.display = 'none';
                name.nextElementSibling.style.display = 'inline-block';
            }
            name.parentElement.parentElement.classList.toggle('edit-mode');
        }
    }
}
//addtodos
class Todos {
    constructor() {
        this.TodoList = new TodoList();
        this.addData = document.querySelector('#add-todo .add');
        this.dataInput = document.querySelector('#add-todo input');
        this.searchFilter = document.querySelector('#search input');
        this.addData.addEventListener('click', (e) => {
            let item = this.dataInput.value.trim();
            //console.log(item);
            this.addTodo(item);
        });
        this.TodoList.todoListe.addEventListener('click', (e) => {
            let deleteVal = e.target;
            this.deleteTodo(deleteVal);
            this.TodoList.count(this.TodoList.todoListe.getElementsByTagName("li").length);
        });
        this.searchFilter.addEventListener('keyup', (e) => {
            let term = this.searchFilter.value.trim();
            this.searchTodo(term);
        });
        this.TodoList.todoListe.addEventListener('click', (e) => {
            let editVal = e.target;
            this.editTodo(editVal);
        });
    }
    addTodo(name) {
        if (name.length) {
            this.TodoList.addTodo(name);
            this.dataInput.value = "";
        }
    }
    deleteTodo(name) {
        this.TodoList.deleteTodo(name);
    }
    searchTodo(name) {
        this.TodoList.searchTodo(name);
    }
    editTodo(name) {
        this.TodoList.editTodo(name);
    }
}
let todos = new Todos();
