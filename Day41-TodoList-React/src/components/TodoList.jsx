import React, { Component } from "react";
import Button from "./Button";
import { toast } from "react-toastify";
import TodoItem from "./TodoItem";
import validateUser from "../assets/js/validateUser";
import { handleLogic } from "../assets/js/script";

export default class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoList: [],
        };
    }

    getTodo = () => {
        setTimeout(async () => {
            await validateUser();
            var listTodo = await handleLogic.getListTodo();
            this.setState({
                todoList: listTodo.data.listTodo,
            });
        });
    };

    componentDidMount() {
        this.getTodo();
    }

    render() {
        const { todoList } = this.state;
        const addTodo = async (e) => {
            e.preventDefault();
            const input = document.querySelector(".input-add-todo");
            const inputValue = input.value.trim();
            if (inputValue) {
                const result = await handleLogic.postTodo({ todo: inputValue });
                if (result.status_code === "SUCCESS") {
                    this.getTodo();
                    toast.success("Thêm thành công!");
                    input.value = "";
                } else if (result.status_code === "FAILED") {
                    toast.error("Thêm thất bại, vui lòng tải lại trang");
                }
            } else {
                toast.error("Vui lòng nhập nội dung!");
            }
        };
        return (
            <>
                <form action="" className="form-add-todo">
                    <div className="form-group relative mb-5">
                        <input
                            type="text"
                            className="input-add-todo w-96 h-14 bg-transparent outline-none px-2 text-white font-semibold text-lg border-b-2 border-emerald-400 pr-32"
                            placeholder="Thêm một việc làm mới"
                        />
                        <Button
                            children="Thêm mới"
                            color="emerald"
                            tailwindCss="absolute top-1/2 right-0 -translate-y-1/2"
                            onClick={(e) => {
                                addTodo(e);
                            }}
                        />
                    </div>
                </form>
                {todoList.map((todoItem, index) => (
                    <TodoItem
                        value={todoItem.todo}
                        key={todoItem._id}
                        id={todoItem._id}
                        onEdit={this}
                        index={index}
                    />
                ))}
            </>
        );
    }
}
