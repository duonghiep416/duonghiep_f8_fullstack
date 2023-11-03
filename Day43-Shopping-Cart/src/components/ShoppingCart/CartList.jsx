import React, { useContext } from "react";
import CartItem from "./CartItem";
import Button from "../Button/Button";
import Context from "../../store/Context";
import payment from "./payment";
export default function CartList() {
    const [state, dispatch] = useContext(Context);
    const { productsCart } = state;
    return productsCart.length ? (
        <div className="cart-list">
            <table className="table-auto w-full">
                <thead>
                    <tr className="text-left">
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {productsCart.map((productCart) => {
                        return (
                            <CartItem
                                key={productCart.id}
                                name={productCart.name}
                                quantity={productCart.quantity}
                                price={productCart.price}
                            />
                        );
                    })}
                </tbody>
            </table>
            <Button
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
                        for (var i = 0; i < state.productsCart.length; i++) {
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
        </div>
    ) : (
        <h3>Không có sản phẩm nào trong giỏ hàng</h3>
    );
}
