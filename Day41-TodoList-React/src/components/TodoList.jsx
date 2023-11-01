import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import Button from "./Button";
import { toast } from "react-toastify";
import TodoItem from "./TodoItem";
import validateUser from "../assets/js/validateUser";
import { handleLogic } from "../assets/js/script";

export default function TodoList() {
    const [todoList, setTodoList] = useState({
        todoData: [],
        todoValue: "",
        todoDataCopy: [],
    });
    const [searchValue, setSearchValue] = useState("");
    const getTodo = () => {
        setTimeout(async () => {
            await validateUser();
            var listTodo = await handleLogic.getListTodo();
            setTodoList((prevState) => ({
                ...prevState,
                todoData: listTodo.data.listTodo,
                todoDataCopy: listTodo.data.listTodo,
            }));
        });
    };

    const addTodo = async (e) => {
        e.preventDefault();

        if (todoList.todoValue) {
            const result = await handleLogic.postTodo({
                todo: todoList.todoValue,
            });
            if (result.status_code === "SUCCESS") {
                toast.success("Thêm thành công!");
                setTodoList((prevState) => ({
                    todoData: [result.data, ...prevState.todoData],
                    todoDataCopy: [result.data, ...prevState.todoData],
                    todoValue: "",
                }));
            } else if (result.status_code === "FAILED") {
                toast.error("Thêm thất bại, vui lòng tải lại trang");
            }
        } else {
            toast.error("Vui lòng nhập nội dung!");
        }
    };

    const searchTodo = async () => {
        const apiKey = localStorage.getItem("apiKey");

        if (searchValue) {
            const result = await handleLogic.searchTodo(
                {
                    q: searchValue,
                },
                apiKey
            );
            if (result.status_code === "SUCCESS") {
                setTodoList((prevState) => ({
                    ...prevState,
                    todoData: result.data.listTodo,
                }));
                if (result.data.listTodo.length === 0) {
                    toast.success("Không tìm thấy kết quả");
                } else {
                    toast.success("Tìm thành công");
                }
            } else if (result.status_code === "FAILED") {
                toast.error("Tìm thất bại, vui lòng thử lại");
            }
        } else {
            setTodoList((prevState) => ({
                ...prevState,
                todoData: prevState.todoDataCopy,
            }));
        }
    };

    const updateSearchValue = (e) => {
        setSearchValue(e?.target?.value);
    };

    useEffect(() => {
        searchTodo();
    }, [searchValue]);

    const debounceOnChange = debounce(updateSearchValue, 1000);

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <>
            <form
                action=""
                className="form-add-todo flex items-center gap-3 mb-5"
            >
                <div className="form-group relative">
                    <input
                        type="text"
                        className="input-add-todo w-96 h-14 bg-transparent outline-none px-2 text-white font-semibold text-lg border-b-2 border-emerald-400 pr-32"
                        placeholder="Thêm một việc làm mới"
                        name="todoValue"
                        value={todoList.todoValue}
                        onChange={(e) => {
                            setTodoList((prevState) => ({
                                ...prevState,
                                todoValue: e.target.value,
                            }));
                        }}
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
            <form
                action=""
                className="search-form"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="form-group relative">
                    <input
                        type="text"
                        className="input-add-todo w-96 h-14 bg-transparent outline-none px-2 text-white font-semibold text-lg border-b-2 border-amber-400 pr-32"
                        placeholder="Tìm kiếm..."
                        name="todoValue"
                        onChange={debounceOnChange}
                    />
                </div>
            </form>
            {todoList.todoData.map((todoItem, index) => (
                <TodoItem
                    value={todoItem.todo}
                    key={todoItem._id}
                    id={todoItem._id}
                    isCompleted={todoItem.isCompleted}
                    onEdit={getTodo}
                    index={index}
                />
            ))}
        </>
    );
}
