import React, { Component } from "react";
import { toast } from "react-toastify";

import Button from "./Button";
import { handleLogic } from "../assets/js/script";

export default class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditButton: true,
            isCompleted: this.props.isCompleted,
            prevIsCompleted: this.props.isCompleted,
            contentInput: this.props.value,
            prevContentInput: this.props.value,
        };
    }
    changeUIEdit = () => {
        this.setState({
            showEditButton: !this.state.showEditButton,
            contentInput: this.state.prevContentInput,
            isCompleted: this.state.prevIsCompleted,
        });
    };

    handleEdit = async () => {
        const id = this.props.id;
        if (!this.state.contentInput) {
            this.handleDelete();
        } else {
            const result = await handleLogic.updateTodo(id, {
                todo: this.state.contentInput,
                isCompleted: this.state.isCompleted,
            });
            if (result.status_code === "SUCCESS") {
                this.setState({
                    prevContentInput: this.state.contentInput,
                    prevIsCompleted: this.state.isCompleted,
                });
                toast.success("Sửa thành công!");
            } else if (result.status_code === "FAILED") {
                toast.error("Sửa thất bại, vui lòng tải lại trang");
            }
        }
    };

    handleDelete = async () => {
        const id = this.props.id;
        const result = await handleLogic.deleteTodo(id);
        if (result.status_code === "SUCCESS") {
            this.props.onEdit.getTodo();
            toast.success("Xóa thành công!");
        } else if (result.status_code === "FAILED") {
            toast.error("Xóa thất bại, vui lòng tải lại trang");
        }
    };

    render() {
        return (
            <div className="todo-item w-[700px] px-9 py-7 bg-white rounded-lg">
                <input
                    type="text"
                    className={`border-slate-400 rounded-md w-full h-12 border outline-none px-4 mb-4 bg-white ${
                        this.state.isCompleted ? "line-through" : ""
                    }`}
                    disabled={!this.state.showEditButton ? false : true}
                    value={this.state.contentInput}
                    onChange={(e) => {
                        this.setState({
                            contentInput: e.target.value,
                        });
                    }}
                />
                <div className="flex items-center">
                    {this.state.showEditButton && (
                        <Button
                            children="Sửa"
                            color="emerald"
                            tailwindCss="mr-2"
                            onClick={this.changeUIEdit}
                        />
                    )}
                    {!this.state.showEditButton && (
                        <>
                            <Button
                                children="Thoát"
                                color="amber"
                                onClick={this.changeUIEdit}
                                tailwindCss="mr-2"
                            />
                            <Button
                                children="Cập nhật"
                                color="emerald"
                                tailwindCss="mr-2"
                                onClick={() => {
                                    this.handleEdit();
                                    this.setState({
                                        showEditButton:
                                            !this.state.showEditButton,
                                        contentInput:
                                            this.state.prevContentInput,
                                    });
                                }}
                            />
                        </>
                    )}

                    <Button
                        children="Xóa"
                        color="red"
                        onClick={this.handleDelete}
                    />
                    {!this.state.showEditButton && (
                        <div className="ml-auto flex items-center gap-2">
                            <input
                                type="checkbox"
                                name={`isCompleted-${this.props.index}`}
                                id={`isCompleted-${this.props.index}`}
                                className="ml-auto w-5 h-5 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600outline-none"
                                onChange={(e) => {
                                    this.setState({
                                        isCompleted: e.target.checked,
                                    });
                                }}
                                checked={this.state.isCompleted ? true : false}
                            />
                            <label htmlFor={`isCompleted-${this.props.index}`}>
                                Completed
                            </label>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
