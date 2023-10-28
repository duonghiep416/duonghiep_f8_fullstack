import React from "react";
import TodoList from "./components/TodoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BallTriangle } from "react-loader-spinner";
export default function App() {
    return (
        <>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#10b981"
                ariaLabel="ball-triangle-loading"
                wrapperClass={"loading"}
                wrapperStyle={{
                    position: "fixed",
                    inset: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="todo-app bg-slate-800 flex flex-col gap-5 items-center py-10 min-h-screen select-none">
                <h2 className="text-white font-bold  text-2xl text-center py-10">
                    Welcome to Todo App!
                </h2>
                <TodoList />
            </div>
        </>
    );
}
