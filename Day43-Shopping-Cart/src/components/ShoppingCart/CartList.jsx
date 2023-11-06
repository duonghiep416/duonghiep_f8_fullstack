import React, { useContext } from "react";
import CartItem from "./CartItem";
import Button from "../Button/Button";
import Context from "../../store/Context";
import payment from "./payment";
import calculateTotal from "./calculateTotal";
export default function CartList() {
    const [state, dispatch] = useContext(Context);
    const { productsCart } = state;
    const { totalPrice, totalQuantity } = calculateTotal(productsCart);
    return productsCart.length ? (
        <div className="cart-list pb-8">
            <table className="table-auto w-full border-collapse border border-slate-500 mt-7">
                <thead>
                    <tr>
                        <th className="border border-slate-700">
                            Tên sản phẩm
                        </th>
                        <th className="border border-slate-700">Số lượng</th>
                        <th className="border border-slate-700">
                            Số lượng còn lại
                        </th>
                        <th className="border border-slate-700">Tổng tiền</th>
                        <th className="border border-slate-700">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {productsCart.map((productCart) => {
                        return (
                            <CartItem
                                key={productCart.id}
                                id={productCart.id}
                                name={productCart.name}
                                quantity={productCart.quantity}
                                price={productCart.price}
                            />
                        );
                    })}
                    <tr>
                        <td className="text-lg font-bold ct-table-col">
                            Thành tiền
                        </td>
                        <td className="ct-table-col">{totalQuantity}</td>
                        <td></td>
                        <td className="ct-table-col">{totalPrice}</td>
                        <td className="ct-table-col">
                            <Button
                                classStyle="ct-btn-primary hover:bg-green-400"
                                onClick={async () => {
                                    await dispatch({
                                        type: "loading/switch",
                                    });
                                    const data = await payment(state);
                                    dispatch({
                                        type: "loading/switch",
                                    });
                                    if (data) {
                                        dispatch({
                                            type: "product/makeEmpty",
                                        });
                                        for (
                                            var i = 0;
                                            i < state.productsCart.length;
                                            i++
                                        ) {
                                            state.productsCart[i].setProduct({
                                                quantity: 0,
                                                price: 0,
                                            });
                                        }
                                    }
                                }}
                            >
                                Thanh toán
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : (
        <h3 className="font-bold text-xl text-green-600 py-4">
            Không có sản phẩm nào trong giỏ hàng
        </h3>
    );
}
