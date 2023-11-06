import React, { useContext } from "react";
import Button from "../Button/Button";
import Context from "../../store/Context";
import {
    decreaseProductCart,
    increaseProductCart,
    removeProductCart,
} from "./action";
export default function CartItem({ quantity, price, name, id }) {
    const [state, dispatch] = useContext(Context);

    return (
        <>
            <tr>
                <td className="ct-table-col">{name}</td>
                <td className="ct-table-col">
                    <Button
                        classStyle="w-6 h-6 inline-flex items-center justify-center rounded-full px-0 py-0 mr-3"
                        onClick={() => {
                            decreaseProductCart(id, dispatch);
                        }}
                    >
                        -
                    </Button>
                    {quantity}
                    <Button
                        classStyle="w-6 h-6 inline-flex items-center justify-center rounded-full px-0 py-0 ml-3"
                        onClick={() => {
                            increaseProductCart(id, dispatch);
                        }}
                    >
                        +
                    </Button>
                </td>
                <td></td>
                <td className="ct-table-col">{price}</td>
                <td className="ct-table-col">
                    <Button
                        onClick={() => {
                            removeProductCart(id, dispatch);
                        }}
                    >
                        Xóa
                    </Button>
                </td>
            </tr>
        </>
    );
}
