import React, { useEffect, useState, useContext } from "react";
import CardItem from "./CardItem";
import getProductList from "./getProductList";
import validateUser from "../../assets/js/validateUser";
import Context from "../../store/Context";

export default function CardList() {
    const [state, dispatch] = useContext(Context);
    const { products } = state;
    const getProduct = () => {
        setTimeout(async () => {
            const data = await getProductList();
            await dispatch({
                type: "products/updateProducts",
                payload: data,
            });
        });
    };
    useEffect(() => {
        (async function () {
            await dispatch({
                type: "loading/switch",
            });
            getProduct();
            await validateUser();
            dispatch({
                type: "loading/switch",
            });
        })();
    }, []);
    return (
        <div className="card-list grid grid-cols-4 gap-4">
            {products.map((product) => {
                return (
                    <CardItem
                        key={product._id}
                        id={product._id}
                        productName={product.name}
                        productPrice={product.price}
                        productImg={product.image}
                        productQuantity={product.quantity}
                    />
                );
            })}
        </div>
    );
}
