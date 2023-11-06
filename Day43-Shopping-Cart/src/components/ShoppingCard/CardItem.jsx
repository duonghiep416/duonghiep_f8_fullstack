import React, { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Context from "../../store/Context";
export default function CardItem(props) {
    const [product, setProduct] = useState({
        quantity: 0,
        price: 0,
    });
    const { productName, productPrice, productImg, productQuantity, id } =
        props;

    const [state, dispatch] = useContext(Context);
    const handleAddCart = () => {
        dispatch({
            type: "products/addCart",
            payload: {
                id: id,
                name: productName,
                quantity: product.quantity,
                price: product.price,
                setProduct: setProduct,
            },
        });
    };

    useEffect(() => {
        if (product.quantity && product.price) {
            handleAddCart();
        }
    }, [product]);
    return (
        <>
            <div className="product-container w-72 shadow-md">
                <div className="product-image">
                    <img
                        src={productImg}
                        alt=""
                        className="card-img w-full h-64 object-cover"
                    />
                </div>
                <div className="product-info px-3 py-4">
                    <h2 className="product-name font-bold text-2xl italic text-amber-500">
                        {productName}
                    </h2>
                    <p className="product-price mt-2 text-[#beaeaa] text-xl">
                        {productPrice}$
                        <span className="higher-price ml-2 line-through text-gray-400 text-sm">
                            {productPrice + 100000}$
                        </span>
                    </p>
                    <p className="product-desc text-lg text-justify">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Nihil culpa voluptatibus at corporis quo. Fugit
                        Lorem, ipsum dolor.
                    </p>
                </div>
                <div className="product-footer flex items-center justify-between px-3 py-4">
                    <Button
                        onClick={() => {
                            setProduct((prev) => ({
                                quantity: prev.quantity + 1,
                                price: prev.price + productPrice,
                            }));
                        }}
                    >
                        Add To Cart
                    </Button>
                    <span className="quantity border-blue-700 border px-3 py-1">
                        Còn {productQuantity} sp
                    </span>
                </div>
            </div>
        </>
    );
}
