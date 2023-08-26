const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const container = $(".todo-container");
const input = $('input[type="text"]');
const addBtn = $(".todo-form .todo-btn");

const todoList = $(".todo-list");
const todoForm = $(".todo-form");
const data = [
    {
        title: "Hello",
    },
];

const formEdit = document.createElement("form");
formEdit.classList.add("todo-form");
formEdit.innerHTML = `<input
type="text"
name="task"
placeholder="What is the task today?"
/>
<button type="submit" class="todo-btn">Add task</button>`;
const app = {
    render: function () {
        let html = data
            .map((todo, index) => {
                return `<div class="todo" id='todo-${index}'>
            <p class="todo-title">${todo.title}</p>
            <div class="todo-action">
                <i class="fa-solid fa-pen-to-square edit-btn"></i>
                <i class="fa-solid fa-trash delete-btn delete-btn-${index}"></i>
            </div>
        </div>`;
            })
            .join("");

        todoList.innerHTML = html;
        app.removeTask();
        app.editTask();
    },

    addTask: function () {
        todoForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const taskTitle = input.value;
            if (taskTitle.trim() !== "") {
                data.push({ title: taskTitle });
                input.value = "";
                app.render();
            }
        });
    },

    removeTask: function () {
        if (data.length) {
            const deleteBtn = $$(".delete-btn");
            deleteBtn.forEach((deleteTask, i) => {
                deleteTask.addEventListener("click", function () {
                    data.splice(i, 1);
                    app.render();
                });
            });
        }
    },

    editTask: function () {
        if (data.length) {
            const editBtn = $$(".edit-btn");
            editBtn.forEach((editBtn, i) => {
                editBtn.addEventListener("click", function (e) {
                    const elementEdit = $(`#todo-${i}`);
                    const formCopy = formEdit.cloneNode(true);
                    const inputFormCopy = formCopy.querySelector("input");
                    todoList.insertBefore(formCopy, elementEdit);
                    elementEdit.style.display = "none";
                    formCopy.addEventListener("submit", (e) => {
                        e.preventDefault();
                        data[i].title = inputFormCopy.value;
                        elementEdit.style.display = "block";
                        app.render();
                    });
                });
            });
        }
    },

    start() {
        this.render();
        this.addTask();
        this.removeTask();
    },
};
app.start();
