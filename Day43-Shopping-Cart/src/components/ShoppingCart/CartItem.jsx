import React from "react";

export default function CartItem({ quantity, price, name }) {
    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{quantity}</td>
                <td>{price}</td>
            </tr>
        </>
    );
}
