import React from "react";

function Button({ text, color, tailwindCss, onClick }) {
    const colorVariants = {
        emerald: "bg-emerald-500 hover:bg-emerald-600",
        red: "bg-red-500 hover:bg-red-600",
        amber: "bg-amber-500 hover:bg-amber-600",
    };
    return (
        <button
            className={`${colorVariants[color]} transition px-3 py-2 rounded-md font-bold text-white text-lg ${tailwindCss}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;
