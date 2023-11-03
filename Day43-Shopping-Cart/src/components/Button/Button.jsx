import React from "react";

export default function Button({ children, classStyle, onClick }) {
    return (
        <button
            className={`transition px-3 py-2 rounded-full border border-yellow-800 text-sm hover:bg-yellow-800 hover:text-white ${classStyle}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
